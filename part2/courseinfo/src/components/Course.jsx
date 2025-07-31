const Header = (props) => {
  return(
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
  
}

const Content = ({course}) => {
  const parts = course.parts;
  return(
    <div>
      {parts.map(part => {
        return <Part key={part.id} part={part.name} exercises={part.exercises} />
      })}
    </div>
  )
}

const Part = (props) => {
  return(
    <p>{props.part}: {props.exercises}</p>
  )
}

const Total = ({course}) => {
  const parts = course.parts;
  return(
    <div>
      <p>Number of exercises: {parts.reduce((sum, part) => {
        return sum + part.exercises;
      } , 0)}</p>
    </div>
  )
}

const Course = ({course}) => {
  return(
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </>
  )
}

export default Course;