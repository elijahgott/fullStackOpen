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
            <div style={blogStyle}>
                {blog.title} - By: {blog.author}<button onClick={toggleDetails}>view</button>
            </div>
        )
    }
    return (
        <div style={blogStyle}>
            <p>{blog.title} - By: {blog.author}<button onClick={toggleDetails}>hide</button></p>
            <p>{blog.url}</p>
            <p>{blog.likes} likes <button onClick={() => likeBlog(blog)}>like</button></p>
            <p>{blog.user.username}</p>
            <button onClick={() => removeBlog(blog)}>remove</button>
        </div>
    )

}

export default Blog