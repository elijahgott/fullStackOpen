import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ user, setNotificationClass, setMessage }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        
        if(title && author && url){
            const newBlog = {
                title,
                author,
                url,
                user
            }

            blogService.create(newBlog)

            setNotificationClass('success')
            setMessage(`New Blog "${title}" by ${author} added!`)
            setTimeout(() => {
                setNotificationClass(null)
            setMessage(null)
            }, 3000)

            setTitle('')
            setAuthor('')
            setUrl('')
        }
        else{
            setNotificationClass('error')
            setMessage(`Failed to add blog.`)
            setTimeout(() => {
                setNotificationClass(null)
            setMessage(null)
            }, 3000)
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} placeholder="Title" />
            <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} placeholder="Author" />
            <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} placeholder="URL" />
            <button type="submit">Submit Blog</button>
        </form>
    )
}

export default CreateBlog