import { useState } from "react"
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { useMutation } from '@apollo/client/react'

const EDIT_BIRTHYEAR = gql`
    mutation editBirthyear(
        $name: String!,
        $setBornTo: Int!
    ) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`

const ALL_AUTHORS = gql`
  query{
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const EditAuthor = ({ authors }) => {
    const [author, setAuthor] = useState('')
    const [birthYear, setBirthYear] = useState('')

    const [editAuthor] = useMutation(EDIT_BIRTHYEAR,
        {
            refetchQueries: [ { query: ALL_AUTHORS } ]
        }
    )

    const handleSubmit = (e) => {
        e.preventDefault()

        const setBornTo = parseInt(birthYear)
        const name = author
        console.log(name, setBornTo)

        editAuthor({ variables: { name, setBornTo } })
        setBirthYear('')
    }

    return(
        <div>
            <h1>Set Birthyear</h1>
            <form onSubmit={handleSubmit}>
                <select onChange={({ target }) => setAuthor(target.value) }>
                    <option value=''>Select an Author</option>
                    {authors.map(a => <option key={ a.name } value={ a.name } >{ a.name }</option>)}
                </select>
                <input type="number" value={ birthYear } onChange={ ({ target }) => setBirthYear(target.value) } placeholder="Author Birthyear" />
                <button type="submit">Update Author</button>
            </form>
            
        </div>
    )
}

export default EditAuthor