import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { MY_RECOMMENDATIONS } from '../queries/auth'
import { ALL_BOOKS } from '../queries/books'

const Recommended = ({ show }) => {
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState([])
  const { data: genreData } = useQuery(MY_RECOMMENDATIONS)
  const [getBooksByGenre, { data: booksResult }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (genreData) {
      setGenre(genreData.me?.favoriteGenre)
      getBooksByGenre({ variables: { genre } })
    }
  }, [show, genreData]) //eslint-disable-line

  useEffect(() => {
    if (booksResult) {
      setBooks(booksResult.allBooks)
    }
  }, [show, booksResult])

  if (!show) return null

  return (
    <div className="recommended-books">
      <p>
        Showing all books in your favourite genre: <strong>{genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
