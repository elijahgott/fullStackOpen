import { useState } from 'react'
import blogService from '../services/blogs'
import styled from 'styled-components'

const Blog = ({ blog, likeBlog, removeBlog }) => {

    const [showDetails, setShowDetails] = useState(false)

    const [likes, setLikes] = useState(blog.likes)

    const toggleDetails = () => {
        setShowDetails(!showDetails)
    }

    // const likeBlog = async (blog) => {
    //     const updatedBlog = blog
    //     updatedBlog.likes += 1

    //     await blogService.update(blog.id, updatedBlog)
    // }

    // const removeBlog = async (blog) => {
    //     if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
    //         await blogService.remove(blog.id)
    //     }
    // }

    // STYLES
    const BlogContainer = styled.div`
        border-bottom: 2px solid peru;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `

    const ExpandedBlogContainer = styled.div`
        border-bottom: 2px solid peru;
        display: block;
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

    if(!showDetails){
        return (
            <BlogContainer data-testid='blogClosed'>
                <p>{blog.title} - By: {blog.author}</p>
                <Button onClick={toggleDetails}>view</Button>
            </BlogContainer>
        )
    }

    return (
        <ExpandedBlogContainer data-testid='blogOpened'>
            <div>
                <p>{blog.title} - By: {blog.author}<Button onClick={toggleDetails}>hide</Button></p>
                <p>{blog.url}</p>
                <p>{likes} likes <Button data-testid='likeButton' onClick={() => {
                    setLikes(likes + 1)
                    likeBlog(blog)}
                }>like</Button></p>
                <p>{blog.user.username}</p>
            </div>
            <Button onClick={() => removeBlog(blog)}>remove</Button>
        </ExpandedBlogContainer>
    )

}

export default Blog