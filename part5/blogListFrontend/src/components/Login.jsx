import {useState} from 'react'
import loginService from '../services/login'

const Login = ({ setNotificationClass, setMessage }) => {
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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} placeholder="Enter Username:" />
                <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} placeholder="Enter Password:" />
                <button type="submit" >Login</button>
            </form>
        </div>
    )
}

export default Login