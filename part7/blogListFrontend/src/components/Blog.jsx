import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import blogService from '../services/blogs'
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

const Button = styled.button`
  color: white;
  background-color: peru;
  border: 2px solid peru;
  border-radius: 4px;
  margin: 4px 0px;
  padding: 8px 16px;
  font-weight: bold;
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

const Blog = ({ blog, blogs, likeBlog, removeBlog }) => {
  const param = useParams().id
  if(param){
    blog = blogs.find(b => b.id === param)
  }

  const [showDetails, setShowDetails] = useState(false)

  const [likes, setLikes] = useState(blog.likes)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
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
      </BlogInfo>
      <Button onClick={() => removeBlog(blog)}>remove</Button>
    </ExpandedBlogContainer>
  )
}

export default Blog
