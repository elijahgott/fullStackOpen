import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;

  if((good + neutral + bad) == 0){
    return(
      <p>No feedback given</p>
    )
    
  }
  else{
    return(
      <table>
        <tbody>
          <StatisticsLine text="good" count={good} />
          <StatisticsLine text="neutral" count={neutral} />
          <StatisticsLine text="bad" count={bad} />
          <StatisticsLine text="all" count={good + bad + neutral} />
          <StatisticsLine text="average" count={((good * 1) + (neutral * 0) + (bad * -1)) / (good + neutral + bad)} />
          <StatisticsLine text="positive" count={(good / (good + bad + neutral)) * 100} character="%"/>
        </tbody>
      </table>
    )
  }
}

const StatisticsLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{Math.round(props.count * 10) / 10} {props.character}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
