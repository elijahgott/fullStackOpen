import styled from 'styled-components'

// STYLING
const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
  margin-bottom: 4px;
  border: none;
  border-bottom: 2px solid black;
`

const Login = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {

  return (
    <Container>
      <h1 style={{ textAlign: 'center', fontSize: 40 }}>Login</h1>
      <Form onSubmit={handleLogin}>
        <Input
          type="text"
          data-testid="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          placeholder="Enter Username:"
        />
        <Input
          type="password"
          data-testid="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Enter Password:"
        />
        <Button data-testid="submitLogin" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default Login
