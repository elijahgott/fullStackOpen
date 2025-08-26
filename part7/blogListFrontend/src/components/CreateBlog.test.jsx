import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'
import { describe, expect } from 'vitest'

// 5.16 -- doesn't work because it wants me to pass handleSubmit function to <CreateBlog /> as a prop, but I don't want to do that
describe('<CreateBlog />', () => {
    test('form calls event handler it received as props when new blog created', () => {
        const user = userEvent.setup()
        const createBlog = vi.fn()

        render(<CreateBlog createBlog={createBlog} />)

        const titleInput = screen.getByPlaceholderText('Title')
        const authorInput = screen.getByPlaceholderText('Author')
        const urlInput = screen.getByPlaceholderText('URL')
        const submitButton = screen.getByText('Submit Blog')

        user.type(titleInput, 'test title')
        user.type(authorInput, 'Joe Rogan')
        user.type(urlInput, 'https://elijahgott.github.io')
        user.click(submitButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('test title')
    })
})