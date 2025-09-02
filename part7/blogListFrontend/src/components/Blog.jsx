import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useNotificationsDispatch } from '../NotificationContext'

import styled from 'styled-components'

// STYLES
const BlogContainer = styled.div`
  border-bottom: 2px solid peru;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
`

const ExpandedBlogContainer = styled.div`
  border-bottom: 2px solid peru;
  display: flex;
  flex-direction: column;
`

const BlogInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const BlogTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledLink = styled(Link)`
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  &:visited {
    color: peru;
  }
  &:hover {
    text-decoration: underline;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: auto;
  margin-left: 0;
  margin-right: auto;
`
const Button = styled.button`
  color: white;
  background-color: peru;
  border: 2px solid peru;
  border-radius: 4px;
  margin: 4px 0px;
  padding: 8px 16px;
  font-weight: bold;
`

const Input = styled.input`
  padding: 8px;
  margin: 4px;
  border: none;
  border-bottom: 2px solid black;
`

const Blog = ({ blog, blogs, likeBlog, removeBlog, setNotificationClass }) => {
  const param = useParams().id
  if(param){
    blog = blogs.find(b => b.id === param)
  }

  const queryClient = useQueryClient()

  const newCommentMutation = useMutation({
    mutationFn: blogService.createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })
  const dispatchNotification = useNotificationsDispatch()

  const [likes, setLikes] = useState(blog.likes)

  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if(comment){
      const updatedBlog = {
        ...blog,
        comment
      }

      newCommentMutation.mutate(updatedBlog)
      setComment('')

      setNotificationClass('success')
      dispatchNotification({
        type: 'SET',
        message: `New Comment "${comment}" added to ${blog.title}`
      })
      setTimeout(() => {
        setNotificationClass(null)
        dispatchNotification({
          type: 'CLEAR'
        })
      }, 5000)
    }
    else{
      setNotificationClass('error')
      dispatchNotification({
        type: 'SET',
        message: 'Error adding comment.'
      })
      setTimeout(() => {
        setNotificationClass(null)
        dispatchNotification({
          type: 'CLEAR'
        })
      }, 5000)
    }
  }

  if (!param) {
    return (
      <BlogContainer data-testid="blogClosed">
        <StyledLink to={`/blogs/${blog.id}`}>
          {blog.title} - By: {blog.author}
        </StyledLink>
      </BlogContainer>
    )
  }

  return (
    <ExpandedBlogContainer data-testid="blogOpened">
      <BlogInfo>
        <BlogTitle>
          <StyledLink to={`/blogs/${blog.id}`}>
            {blog.title} - By: {blog.author}
          </StyledLink>
        </BlogTitle>
        <StyledLink to={blog.url} target='_blank'>
          {blog.url}
        </StyledLink>
        <p>
          {likes} likes{' '}
          <Button
            data-testid="likeButton"
            onClick={() => {
              setLikes(likes + 1)
              likeBlog(blog)
            }}
          >
            like
          </Button>
        </p>
        <p>Added by: {blog.user.username}</p>
        <h3>Comments</h3>
        {blog.comments.length === 0
          ? (<p style={{ color: 'gray', marginLeft: 8 }}>Nothing to see here...</p>)
          : (
            <ul>
              {blog.comments.map(c => <li key={`${blog.id + c}`}>{c}</li>)}
            </ul>
          )}
        <Form onSubmit={ handleSubmit }>
          <Input
            type="text"
            data-testid="comment"
            name='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="Add Comment..."
          />
          <Button type='submit'>Submit</Button>
        </Form>
      </BlogInfo>
      <Button onClick={() => removeBlog(blog)}>remove</Button>
    </ExpandedBlogContainer>
  )
}

export default Blog
