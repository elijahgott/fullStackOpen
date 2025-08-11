const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  
  const user = await User.findById(body.userId)

  if(!user){
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

// 4.13
blogsRouter.delete('/:id', async (request, response) => {
  try{
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  catch(exception){
    response.status(404).end()
  }
})

// 4.14
blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = {
    title,
    author,
    url,
    likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, runValidators: true})
  
  if(!updatedBlog){
    return response.status(404).send({ error: 'Blog does not exist'})
  }

  response.json(updatedBlog)
})

module.exports = blogsRouter