const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try{
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
  catch(exception){
    next(exception)
  }
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