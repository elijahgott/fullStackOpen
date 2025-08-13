import { useState, useEffect } from 'react'
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
            <h2>blogs</h2>
            <button onClick={() => {
              console.log('log out')
              window.localStorage.removeItem('loggedInUser')
            }}>Log Out</button>
            <CreateBlog user={user} setNotificationClass={setNotificationClass} setMessage={setMessage} />
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
              )
            }
          </>
      }
    </div>
  )
}

export default App