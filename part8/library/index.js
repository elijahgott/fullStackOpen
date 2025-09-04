const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuidv1 } = require('uuid')

let books = [
  {
    title: 'No Country for Old Men',
    author: 'Cormac McCarthy',
    genres: ['cool'],
    id: uuidv1()
  },
  {
    title: 'Blood Meridian',
    author: 'Cormac McCarthy',
    genres: ['cool', 'badass'],
    id: uuidv1()
  },
  {
    title: 'The Joe Rogan Book',
    author: 'Joe Rogan',
    genres: ['badass'],
    id: uuidv1()
  }
]

let authors = [
  {
    name: 'Joe Rogan',
    born: 1902,
    id: uuidv1()
  },
  {
    name: 'Cormac McCarthy',
    born: 1525,
    id: uuidv1()
  }
]

const typeDefs = `
  type Book {
    title: String!
    author: String
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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let ret = [...books]
      console.log(args)

      if(args.author){
        ret = ret.filter(b => b.author === args.author)
      }
      if(args.genre){
        ret = ret.filter(b => b.genres.includes(args.genre))
      }
      return ret
    },
    allAuthors: () => authors
  },
  Mutation: {
    addBook: (root, args) => {
      if(args.author){
        const authorName = args.author

        if(!authors.find(a => a.name === authorName)){
          const newAuthor = { id: uuidv1(), name: authorName }
          authors = authors.concat(newAuthor)
        }
      }

      const newBook = { ...args, id: uuidv1() }
      books = books.concat(newBook)

      return newBook
    },
    editAuthor: (root, args) => {
      const authorName = args.name
      const author = authors.find(a => a.name === authorName)

      if(!author) return null

      const editedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.id === author.id ? editedAuthor : a)

      return editedAuthor
    }
  },
  Author: {
    bookCount: (root) => books.filter(b => b.author === root.name).length
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})