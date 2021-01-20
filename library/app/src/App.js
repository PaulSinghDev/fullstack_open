import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState('')
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const localToken = localStorage.getItem('library-user-data')
    if (localToken) {
      setToken(localToken)
    }
  }, [])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button type="button" onClick={logout}>
              Logout
            </button>
            <button type="button" onClick={() => setPage('recommended')}>
              Recommended
            </button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>Login</button>
        )}
      </div>

      <Authors token={token} show={page === 'authors'} />

      <Books token={token} show={page === 'books'} setError={setError} />

      <Login setToken={setToken} show={page === 'login'} setError={setError} />

      {token && <Recommended token={token} show={page === 'recommended'} />}
    </div>
  )
}

export default App
