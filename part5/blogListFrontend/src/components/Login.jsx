const Login = ({ handleLogin, username, setUsername, password, setPassword }) => {
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" data-testid='username' value={username} name="Username" onChange={({ target }) => setUsername(target.value)} placeholder="Enter Username:" />
                <input type="password" data-testid='password' value={password} name="Password" onChange={({ target }) => setPassword(target.value)} placeholder="Enter Password:" />
                <button data-testid='submitLogin' type="submit" >Login</button>
            </form>
        </div>
    )
}

export default Login