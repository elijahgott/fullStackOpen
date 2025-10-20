import { useState, useEffect } from "react"
import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"

const Login = ({ show, setToken, setPage }) => {
    if(!show) {
        return null
    }

    const LOGIN = gql`
        mutation login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                value
            }
        }
    `

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error)
        }
    })

    useEffect(() => {
        if( result.data ){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
            setPage('authors')
        }
    }, [result.data])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        login({ variables: {username, password}})

        setUsername('')
        setPassword('')

    }

    return(
        <>
            <h1>Log yo ass in</h1>
            <form onSubmit={handleLogin}>
                <input placeholder="name" type="text" minLength={3} id="name" value={username} onChange={({target}) => setUsername(target.value)} />
                <input placeholder="password" type="password" minLength={3} id="password" value={password} onChange={({target}) => setPassword(target.value)} />
                <button type="submit" >login</button>
            </form>
        </>
    )
}

export default Login