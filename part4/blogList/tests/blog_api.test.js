const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('With blogs in DB', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        
        const blogObjs = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogObjs.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    // 4.8
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    // 4.9
    test('blogs have unique id\'s', async () => {
        const response = await api.get('/api/blogs')
        const ids = response.body.map(blog => blog.id)
        const idSet = new Set()

        for(const id of ids){
            assert(!idSet.has(id))
            idSet.add(id)
        }
    })

    // 4.11
    // if likes missing, default value to 0
})

describe('adding new blog', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        
        const blogObjs = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogObjs.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    // 4.10
    test('POST successfully creates blog', async () => {
        const newBlog = {
            title: 'Joe Rogan missing link between humans and apes',
            author: 'Me',
            url: 'https://www.earth.com/news/missing-link-apes-early-humans/',
            likes: 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const blogs = response.body.map(blog => blog.title)
        
        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

        assert(blogs.includes('Joe Rogan missing link between humans and apes'))
    })

    // 4.12
    // if title or url values are missing, server responds with status code 400 Bad Request
})

describe('deleting blog', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        
        const blogObjs = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogObjs.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    // 4.13
    test('delete blog from id', async () => {
        const response = await api.get('/api/blogs')
        const blogToDelete = response.body[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        
        const responseAfterDeletion = await api.get('/api/blogs')

        assert.strictEqual(responseAfterDeletion.body.length, response.body.length - 1)
    })
})

describe('updating blog', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        
        const blogObjs = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogObjs.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    // 4.13
    test('update likes from id', async () => {
        const response = await api.get('/api/blogs')
        const blogToUpdate = response.body[0]
        blogToUpdate.likes = 333

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
        
        const responseAfterUpdate = await api.get('/api/blogs')

        assert.strictEqual(responseAfterUpdate.body[0].likes, 333)
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'elo',
            name: 'elo goto',
            password: 'gelo',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})