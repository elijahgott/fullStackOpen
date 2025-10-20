import { gql } from "@apollo/client"
import { useQuery } from '@apollo/client/react'

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

const Recommend = ({show, user}) => {
    const result = useQuery(ALL_BOOKS)

    if(result.loading) return <div>Loading...</div>

    const books = result.data.allBooks || []

    if(!show) return null

    return(
        <>
            <h1>Recommend this MF!</h1>
            <p>books in your favorite genre: <strong>{user.favoriteGenre}</strong></p>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.filter(b => b.genres.includes(user.favoriteGenre)).map((a) => (
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default Recommend