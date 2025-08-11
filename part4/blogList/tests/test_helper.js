const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Understanding how API routes work in Next.js',
    author: 'Cody Jarrett',
    url: 'https://dev.to/codymjarrett/understanding-how-api-routes-work-in-next-js-50fm',
    likes: 4
  },
  {
    title: 'Website Setup Essentials',
    author: 'PRIM4T',
    url: 'https://dev.to/prim4t/website-setup-essentials-447o',
    likes: 3
  },
  {
    title: 'Gender Bender Jenner\'s Fender Bender',
    author: 'Nicole Mullen',
    url: 'https://goated.website',
    likes: 10
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}