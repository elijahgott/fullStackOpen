import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, likeBlog, removeBlog }) => {
    const blogStyle = {
        border: '2px solid black',
        borderRadius: '8px',
        padding: '8px',
        margin: '8px'
    }

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

    if(!showDetails){
        return (
            <div data-testid='blogClosed' style={blogStyle}>
                {blog.title} - By: {blog.author}<button onClick={toggleDetails}>view</button>
            </div>
        )
    }
    return (
        <div data-testid='blogOpened' style={blogStyle}>
            <p>{blog.title} - By: {blog.author}<button onClick={toggleDetails}>hide</button></p>
            <p>{blog.url}</p>
            <p>{likes} likes <button data-testid='likeButton' onClick={() => {
                setLikes(likes + 1)
                likeBlog(blog)}
            }>like</button></p>
            <p>{blog.user.username}</p>
            <button onClick={() => removeBlog(blog)}>remove</button>
        </div>
    )

}

export default Blog