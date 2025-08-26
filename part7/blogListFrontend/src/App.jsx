import { useState, useEffect } from 'react'
import styled from 'styled-components'
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

    // STYLING
    const Container = styled.div`
        background-color: antiquewhite;
        width: 90%;
        margin: 0 auto;
        padding: 12px;
        border: 4px solid peru;
        border-radius: 8px;
    `
    const Button = styled.button`
        color: white;
        background-color: peru;
        border: 2px solid peru;
        border-radius: 4px;
        padding: 8px 16px;
        margin: 4px auto;
        font-weight: bold;
    `

    const Header = styled.div`
        display: flex;
        flex-direction: row;
        align-items: baseline;
        justify-content: space-between;
    `

    return (
        <Container>
            <Notification className={notificationClass} message={message} />
            { user === null
                ? <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
                :
                <>
                    <Header>
                        <h2 style={{ fontSize: '32px' }}>Blogs</h2>
                        <div>
                            Signed in as {user.username}
                            <Button style={{ marginLeft: 4 }} onClick={() => {
                                window.localStorage.removeItem('loggedInUser')
                                setUser(null)
                            }}>Log Out</Button>
                        </div>
                    </Header>

                    <Togglable buttonLabel={'New Note'} >
                        <CreateBlog user={user} setNotificationClass={setNotificationClass} setMessage={setMessage} />
                    </Togglable>
                    {blogs.sort(byLikes).map(blog =>
                        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
                    )
                    }
                </>
            }
        </Container>
    )
}

export default App