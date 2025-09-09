const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('graphql')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuidv1 } = require('uuid')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

require('dotenv').config() 

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int
    genres: [String]
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(args.author && args.genre){
        const author = await Author.findOne({ name: args.author })
        return await Book.find({$and: [{ author: author}, { genres: { $in: [args.genre] } }] }).populate('author')
      }
      else if(args.author){
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: author }).populate('author')
      }
      else if(args.genre){
        return await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
      else{
        return await Book.find({}).populate('author')
      }
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args) => {
      const currentUser = context.currentUser

      if(!currentUser){
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }

      try{
        let author = await Author.findOne({ name: args.author })
        if(!author){
          author = new Author({ name: args.author })
          await author.save()
        }
        
        const newBook = new Book({ ...args, author })

        return await newBook.save()
      }
      catch(error){
        let errorMessage = "Saving book failed"

        if (error instanceof mongoose.Error.ValidationError) {
          console.log(error.message)

          if (error.errors.hasOwnProperty("name")) {
            errorMessage = "Saving book failed. Author name is not valid"
          } else if (error.errors.hasOwnProperty("title")) {
            errorMessage = "Saving book failed. Book title is not valid"
          }
          throw new GraphQLError(errorMessage, {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        } else {
          console.log(error);
          throw new GraphQLError(errorMessage)
        }
      }
    },
    editAuthor: async (root, args) => {
      const currentUser = context.currentUser

      if(!currentUser){
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }

      const authorName = args.name
      const author = await Author.find({ name: authorName })

      if(!author) return null

      author.born = args.setBornTo

      try{
        return await author.save()
      }
      catch(error){
        console.log(error);
        throw new GraphQLError('Editing author failed.')
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if(!user || args.password !== '1234'){
        throw new GraphQLError('Wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Author: {
    bookCount: async (root) => await Book.find({ name: root.id }).countDocuments()
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.startsWith('Bearer ')){
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})