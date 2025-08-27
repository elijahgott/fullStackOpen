import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe, expect } from 'vitest'

// 5.13
describe('<Blog /> without pressing view button', () => {
  test('Renders Title and Author', () => {
    const blog = {
      title: 'test title',
      author: 'Joe Rogan',
      url: 'https://elijahgott.github.io',
      likes: 100,
      user: {
        username: 'joerogan',
        name: 'Joe Rogan',
        passwordHash: '1234',
      },
    }

    render(<Blog blog={blog} />)

    const titleAndAuthor = screen.getByText(
      `${blog.title} - By: ${blog.author}`,
    )
    expect(titleAndAuthor).toBeDefined()
  })

  test("Doesn't render URL or likes", () => {
    const blog = {
      title: 'test title',
      author: 'Joe Rogan',
      url: 'https://elijahgott.github.io',
      likes: 100,
      user: {
        username: 'joerogan',
        name: 'Joe Rogan',
        passwordHash: '1234',
      },
    }

    render(<Blog blog={blog} />)

    const details = screen.queryByText(`${blog.url}${blog.likes}`)
    expect(details).toBeNull()
  })
})

// 5.14
describe('<Blog /> after pressing view button', () => {
  test('Renders URL and likes', async () => {
    const blog = {
      title: 'test title',
      author: 'Joe Rogan',
      url: 'https://elijahgott.github.io',
      likes: 100,
      user: {
        username: 'joerogan',
        name: 'Joe Rogan',
        passwordHash: '1234',
      },
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    screen.debug()

    const details = screen.queryByText(`${blog.url}${blog.likes} likes`)
    expect(details).toBeDefined()
  })
})

describe('Like button', () => {
  test('when clicked twice, event handler (from props) called twice', async () => {
    const blog = {
      title: 'test title',
      author: 'Joe Rogan',
      url: 'https://elijahgott.github.io',
      likes: 100,
      user: {
        username: 'joerogan',
        name: 'Joe Rogan',
        passwordHash: '1234',
      },
    }

    const mockLikeHandler = vi.fn()

    render(
      <Blog blog={blog} likeBlog={mockLikeHandler} removeBlog={() => null} />,
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
