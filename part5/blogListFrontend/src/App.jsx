import { useState, useEffect } from 'react'
import Togglable from './components/Togglable'
import Login from './components/Login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    // for notification
    const [message, setMessage] = useState(null)
    const [notificationClass, setNotificationClass] = useState(null)

    // for sorting blogs by likes
    const byLikes = (b1, b2) => b2.likes - b1.likes

    // for blog component
    const likeBlog = async (blog) => {
        const updatedBlog = blog
        updatedBlog.likes += 1

        await blogService.update(blog.id, updatedBlog)
    }

    // for blog component
    const removeBlog = async (blog) => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
            await blogService.remove(blog.id)
        }
    }

    // for logging in
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        try{
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedInUser', JSON.stringify(user))

            setUser(user)
            setUsername('')
            setPassword('')

            setMessage(`Signed in as ${username}`)
            setNotificationClass('success')
            setTimeout(() => {
                setMessage(null)
                setNotificationClass(null)
            }, 3000)
        }
        catch(exception){
            setMessage('Wrong username or password.')
            setNotificationClass('error')
            setTimeout(() => {
                setMessage(null)
                setNotificationClass(null)
            }, 3000)
        }
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const userJSON = window.localStorage.getItem('loggedInUser')

        if(userJSON){
            const user = JSON.parse(userJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    return (
        <div>
            <Notification className={notificationClass} message={message} />
            { user === null
                ? <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
                : <>
                    <h2>Blogs</h2>
                    <div>
                        Signed in as {user.username}
                        <button onClick={() => {
                            window.localStorage.removeItem('loggedInUser')
                            setUser(null)
                        }}>Log Out</button>
                    </div>

                    <Togglable buttonLabel={'New Note'} >
                        <CreateBlog user={user} setNotificationClass={setNotificationClass} setMessage={setMessage} />
                    </Togglable>
                    {blogs.sort(byLikes).map(blog =>
                        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
                    )
                    }
                </>
            }
        </div>
    )
}

export default App