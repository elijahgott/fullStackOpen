import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find((u) => u.id === id)

  return (
    <>
      <h1>{user.username}</h1>
      <h2>Added Blogs</h2>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
