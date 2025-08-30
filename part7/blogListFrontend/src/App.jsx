import { useState, useEffect, useReducer, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import UserContext from './UserContext'
import { userReducer } from './UserContext'
import styled from 'styled-components'

import Togglable from './components/Togglable'
import Login from './components/Login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Users from './components/Users'
import User from './components/User'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

import { useNotificationsDispatch } from './NotificationContext'

// STYLING
const Container = styled.div`
  background-color: antiquewhite;
  width: 90%;
  margin: 5% auto;
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

const App = () => {
  const queryClient = useQueryClient()

  // for logged in user
  const [user, userDispatch] = useReducer(userReducer, null)

  // for notification
  const dispatchNotification = useNotificationsDispatch()
  const [notificationClass, setNotificationClass] = useState(null)

  // for sorting blogs by likes
  const byLikes = (b1, b2) => b2.likes - b1.likes

  // for blog component
  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const likeBlog = async (blog) => {
    const updatedBlog = blog
    updatedBlog.likes += 1

    likeBlogMutation.mutate(updatedBlog)
  }

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  // for logging in
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      userDispatch({
        type: 'SET',
        payload: user,
      })

      setUsername('')
      setPassword('')

      dispatchNotification({
        type: 'SET',
        message: `Signed in as ${username}`,
      })
      setNotificationClass('success')
      setTimeout(() => {
        dispatchNotification({
          type: 'CLEAR',
        })
        setNotificationClass(null)
      }, 3000)
    } catch (exception) {
      dispatchNotification({
        type: 'SET',
        message: 'Wrong username or password.',
      })
      setNotificationClass('error')
      setTimeout(() => {
        dispatchNotification({
          type: 'CLEAR',
        })
        setNotificationClass(null)
      }, 3000)
    }
  }

  // gets all blogs
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  })

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedInUser')

    if (userJSON) {
      const user = JSON.parse(userJSON)
      userDispatch({
        type: 'SET',
        payload: user,
      })
      blogService.setToken(user.token)
    }
  }, [])

  // gets all users
  const userResult = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  const blogs = result.data
  const users = userResult.data

  return (
    <Router>
      <UserContext.Provider value={[user, userDispatch]}>
        <Container>
          <Notification className={notificationClass} />
          {user === null ? (
            <Login
              handleLogin={handleLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          ) : (
            <>
              <Header>
                <h2 style={{ fontSize: '32px' }}>Blogs</h2>
                <div>
                  Signed in as {user.username}
                  <Button
                    style={{ marginLeft: 4 }}
                    onClick={() => {
                      window.localStorage.removeItem('loggedInUser')
                      userDispatch({ type: 'CLEAR' })
                      setNotificationClass('success')
                      dispatchNotification({
                        type: 'SET',
                        message: 'Signed out.',
                      })
                      setTimeout(() => {
                        dispatchNotification({
                          type: 'CLEAR',
                        })
                        setNotificationClass(null)
                      }, 3000)
                    }}
                  >
                    Log Out
                  </Button>
                </div>
              </Header>
            </>
          )}

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Togglable buttonLabel={'New Note'}>
                    <CreateBlog setNotificationClass={setNotificationClass} />
                  </Togglable>
                  {blogs.sort(byLikes).map((blog) => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      likeBlog={likeBlog}
                      removeBlog={removeBlog}
                    />
                  ))}
                </>
              }
            />
            <Route
              path="/users"
              element={
                <>
                  <h1>Users</h1>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>blogs created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!users
                        ? null
                        : users.map((u) => <Users key={u.id} user={u} />)}
                    </tbody>
                  </table>
                </>
              }
            />
            <Route path="/users/:id" element={<User users={users} />} />
          </Routes>
        </Container>
      </UserContext.Provider>
    </Router>
  )
}

export default App
