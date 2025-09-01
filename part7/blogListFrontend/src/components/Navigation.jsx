import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { userReducer } from '../UserContext'
import { useNotificationsDispatch } from '../NotificationContext'

const NavContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 8px;
  border: 2px solid peru;
  border-radius: 8px;
`

const StyledLink = styled(Link)`
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
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

const Navigation = ({ user, userDispatch }) => {
  // for notification
  const dispatchNotification = useNotificationsDispatch()
  const [notificationClass, setNotificationClass] = useState(null)

  return(
    <NavContainer>
      <ul style={{ display: 'flex', listStyle: 'none', paddingLeft: 8 }}>
        <li style={{ paddingRight: 12 }}>
          <StyledLink to={'/blogs/'}>Blogs</StyledLink>
        </li>
        <li>
          <StyledLink to={'/users/'}>Users</StyledLink>
        </li>
      </ul>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <p>Signed in as <strong>{user.username}</strong></p>
        <Button
          style={{ marginLeft: 4 }}
          onClick={() => {
            window.localStorage.removeItem('loggedInUser')
            userDispatch({ type: 'CLEAR' })
            setNotificationClass('success')
            dispatchNotification({
              type: 'SET',
              message: 'Signed out.',
            })
            setTimeout(() => {
              dispatchNotification({
                type: 'CLEAR',
              })
              setNotificationClass(null)
            }, 3000)
          }}
        >
          Log Out
        </Button>
      </div>
    </NavContainer>
  )
}

export default Navigation