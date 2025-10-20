import { useState, useEffect } from "react";
import { useQuery } from '@apollo/client/react'
import { gql } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from './components/Login'
import Recommend from "./components/Recommend";

const ME = gql`
    query me {
        me {
            username
            favoriteGenre
        }
    }
`

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)

  useEffect(() => {
    const localToken = localStorage.getItem('library-user-token')
    if(localToken){
      setToken(localToken)
    }
  }, [])

  const result = useQuery(ME)

  if(result.loading){
    return <div>Loading...</div>
  }

  const user = result.data.me || null

  const handleLogout = () => {
    localStorage.removeItem('library-user-token')
    setToken(null)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => handleLogout()}>logout</button>
          </>
        )}
        {!token && (<button onClick={() => setPage("login")}>login</button>)}
        <div style={{textAlign: 'right'}} >{user.username}</div>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommend show={page === 'recommend'} user={user} />

      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
