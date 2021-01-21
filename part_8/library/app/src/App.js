import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries/books'

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

  const updateCacheWith = (addedBook) => {
    // Fix this
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    const includedAlready = !!dataInStore.allBooks.find(
      (b) => b.id === addedBook.id
    )
    if (!includedAlready) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      window.alert('New book added to the book list')
    },
  })

  return (
    <div>
      {error && <p>{error}</p>}
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
