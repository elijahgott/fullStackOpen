import { useState, useEffect } from 'react'
import Togglable from './components/Togglable'
import Login from './components/Login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    // for notification
    const [message, setMessage] = useState(null)
    const [notificationClass, setNotificationClass] = useState(null)

    // for sorting blogs by likes
    const byLikes = (b1, b2) => b2.likes - b1.likes

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
            { user === null ?
                <Login setNotificationClass={setNotificationClass} setMessage={setMessage} />
                : <>
                    <h2>Blogs</h2>
                    <div>
                        Signed in as {user.username}
                        <button onClick={() => {
                            window.localStorage.removeItem('loggedInUser')
                        }}>Log Out</button>
                    </div>

                    <Togglable buttonLabel={'New Note'} >
                        <CreateBlog user={user} setNotificationClass={setNotificationClass} setMessage={setMessage} />
                    </Togglable>
                    {blogs.sort(byLikes).map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    )
                    }
                </>
            }
        </div>
    )
}

export default App