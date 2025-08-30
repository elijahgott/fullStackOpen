import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// STYLES
const Container = styled.div`
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

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <Container>
      <div style={hideWhenVisible}>
        <Button data-testid="toggleButton" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <Container style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </Container>
    </Container>
  )
}

// Togglable.PropTypes = {
//   buttonLabel: PropTypes.string.isRequired,
// }

export default Togglable
