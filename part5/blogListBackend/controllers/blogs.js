const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body
  const user = request.user
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
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { id } = request.params
  const user = request.user
  const blogToDelete = await Blog.findById(id)

  if(blogToDelete.user.toString() !== user.id.toString()){
    return response.status(401).json({ error: 'Unauthorized to delete'})
  }
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

// 4.14
blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, user } = request.body
  
  const blog = {
    title,
    author,
    url,
    likes,
    user: user.id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, runValidators: true})
  
  if(!updatedBlog){
    return response.status(404).send({ error: 'Blog does not exist'})
  }

  response.json(updatedBlog)
})

module.exports = blogsRouter