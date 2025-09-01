const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

// get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// create new blog
blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
    comments: body.comments || []
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

// 4.13
// delete blog
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
// update blog
blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, user, comments } = request.body
  
  const blog = {
    title,
    author,
    url,
    likes,
    user: user.id,
    comments
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, runValidators: true})
  
  if(!updatedBlog){
    return response.status(404).send({ error: 'Blog does not exist'})
  }

  response.json(updatedBlog)
})

// commenting on blogs
blogsRouter.post('/:id/comments', async (request, response) => {
  if(!request.body.comment){
    return response.status(400).json({ error: 'Missing values' })
  }
  const id = request.params.id
  const comment = request.body.comment

  const blog = await Blog.findById(id)
  if(!blog){
    return response.status(404).json({ error: 'Blog not found' })
  }

  blog.comments = blog.comments.concat(comment)

  await blog.save()

  response.status(201).json(comment) 
})

module.exports = blogsRouter