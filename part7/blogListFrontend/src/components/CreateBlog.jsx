import { useState } from 'react'
import blogService from '../services/blogs'
import styled from 'styled-components'

const CreateBlog = ({ user, setNotificationClass, setMessage }) => {
    const formStyle={
        margin: '8px'
    }

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
            setMessage('Failed to add blog.')
            setTimeout(() => {
                setNotificationClass(null)
                setMessage(null)
            }, 3000)
        }
    }

    // STYLES
    const Container = styled.div`
        width: 90%;
        margin: 0 auto;
    `

    const Form = styled.form`
        display: flex;
        flex-direction: row;
        width: fit-content;
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

    return(
        <Form style={formStyle} onSubmit={handleSubmit}>
            <Input type="text" data-testid='title' value={title} onChange={({ target }) => setTitle(target.value)} placeholder="Title" />
            <Input type="text" data-testid='author' value={author} onChange={({ target }) => setAuthor(target.value)} placeholder="Author" />
            <Input type="text" data-testid='url' value={url} onChange={({ target }) => setUrl(target.value)} placeholder="URL" />
            <Button type="submit" data-testid='submitBlog'>Submit Blog</Button>
        </Form>
    )
}

export default CreateBlog