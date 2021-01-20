import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries/books'
import NewBook from './NewBook'

const Books = ({ show, token, setError }) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState('')
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      const genreArray = books.reduce((acc, current) => {
        for (let genre of current.genres) {
          if (!acc.includes(genre)) {
            acc.push(genre)
          }
        }
        return acc
      }, [])
      setGenres(genreArray)
    }
  }, [books, result, token])

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <div className="filters">
        {genres.map((g) => (
          <button
            type="button"
            style={{
              margin: '1rem 0.25rem',
              padding: '0.5rem 1rem',
              borderRadius: 5,
              cursor: 'pointer',
              color: 'white',
              backgroundColor: g === filter ? 'coral' : 'royalblue',
            }}
            onClick={() => setFilter(g)}
            key={g}
          >
            {g}
          </button>
        ))}
        <button
          style={{
            margin: '1rem 0.25rem',
            padding: '0.5rem 1rem',
            borderRadius: 5,
            cursor: 'pointer',
            color: 'white',
            backgroundColor: !filter ? 'coral' : 'royalblue',
          }}
          type="button"
          onClick={() => setFilter('')}
        >
          All
        </button>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) =>
            !filter ? (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ) : (
              a.genres.includes(filter) && (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>

      {token && <NewBook setError={setError} />}
    </div>
  )
}

export default Books
