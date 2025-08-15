import { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const Login = ({ setNotificationClass, setMessage }) => {
    const loginStyle = {
        textAlign: 'center',
        width: 'fit-content',
        margin: '0 auto',
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        try{
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedInUser', JSON.stringify(user))

            setUser(user)
            setUsername('')
            setPassword('')

            setMessage(`Signed in as ${username}`)
            setNotificationClass('success')
            setTimeout(() => {
                setMessage(null)
                setNotificationClass(null)
            }, 3000)
        }
        catch(exception){
            setMessage('Wrong username or password.')
            setNotificationClass('error')
            setTimeout(() => {
                setMessage(null)
                setNotificationClass(null)
            }, 3000)
        }
    }

    return (
        <div style={loginStyle}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" data-testid='username' value={username} name="Username" onChange={({ target }) => setUsername(target.value)} placeholder="Enter Username:" />
                <input type="password" data-testid='password' value={password} name="Password" onChange={({ target }) => setPassword(target.value)} placeholder="Enter Password:" />
                <button data-testid='submitLogin' type="submit" >Login</button>
            </form>
        </div>
    )
}

Login.PropTypes = {
    setNotificationClass: PropTypes.string.isRequired,
    setMessage: PropTypes.string.isRequired
}

export default Login