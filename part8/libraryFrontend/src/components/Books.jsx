import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { useState } from 'react'

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author{
        name
      }
      published
      genres
    }
  }
`

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('')

  if (!props.show) {
    return null
  }

  if(result.loading){
    return <div>Loading...</div>
  }

  const books = result.data.allBooks || []

  const genres = books.map(b => b.genres).flat(1)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filter && books.filter(b => b.genres.includes(filter)).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
          {!filter && books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
            <button key={g} onClick={() => setFilter(g)}>{g}</button>
          ))}
      <button key={'all'} onClick={() => setFilter('')}>all genres</button>
    </div>
  )
}

export default Books
