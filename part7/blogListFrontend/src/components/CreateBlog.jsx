import { useState, useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import styled from 'styled-components'

import UserContext from '../UserContext'
import { useNotificationsDispatch } from '../NotificationContext'

// STYLES
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: auto;
  margin: 0 auto;
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

const Input = styled.input`
  padding: 8px;
  margin: 4px;
  border: none;
  border-bottom: 2px solid black;
`

const CreateBlog = ({ setNotificationClass }) => {
  const [user] = useContext(UserContext)
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
  const dispatchNotification = useNotificationsDispatch()

  const formStyle = {
    margin: '8px',
  }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (title && author && url && title.length >= 5) {
      const newBlog = {
        title,
        author,
        url,
        user,
      }

      newBlogMutation.mutate(newBlog)

      setNotificationClass('success')
      dispatchNotification({
        type: 'SET',
        message: `New Blog "${title}" by ${author} added!`,
      })
      setTimeout(() => {
        setNotificationClass(null)
        dispatchNotification({
          type: 'CLEAR',
        })
      }, 3000)

      setTitle('')
      setAuthor('')
      setUrl('')
    } else {
      setNotificationClass('error')
      dispatchNotification({
        type: 'SET',
        message: 'Failed to add blog.',
      })
      setTimeout(() => {
        setNotificationClass(null)
        dispatchNotification({
          type: 'CLEAR',
        })
      }, 3000)
    }
  }

  return (
    <Form style={formStyle} onSubmit={handleSubmit}>
      <Input
        type="text"
        data-testid="title"
        name='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        placeholder="Title"
      />
      <Input
        type="text"
        data-testid="author"
        name='author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        placeholder="Author"
      />
      <Input
        type="text"
        data-testid="url"
        name='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        placeholder="URL"
      />
      <Button type="submit" data-testid="submitBlog">
        Submit Blog
      </Button>
    </Form>
  )
}

export default CreateBlog
