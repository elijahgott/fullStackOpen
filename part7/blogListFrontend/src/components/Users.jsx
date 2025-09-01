import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  color: black;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  &:visited {
    color: peru;
  }
  &:hover {
    text-decoration: underline;
  }
`

const User = ({ user }) => {
  return (
    <tr>
      <td>
        <StyledLink to={`/users/${user.id}`}>{user.username}</StyledLink>
      </td>
      <td style={{ fontWeight: 'bold', textAlign: 'right', fontSize: 16 }}>{user.blogs.length}</td>
    </tr>
  )
}

export default User
