const Hello = (props) => {
  console.log(props);
  return(
    <div>
      <p>Hello {props.name}, you are {props.age}.</p>
    </div>
  )
}


const App = () => {
  const name = "Joshua"
  const age = 'retarded'
  return (
    <>
      <h1>Greetings human</h1>
      <Hello name="Ghey Fagit" age="100"/>
      <Hello name={name} age={age}/>
    </>
  )
}

export default App
