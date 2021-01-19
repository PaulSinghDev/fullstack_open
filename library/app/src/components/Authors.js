import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BORN_YEAR } from '../queries/authors'

const Authors = (props) => {
  const [authors, setAuthors] = useState([])
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [changeAuthor] = useMutation(EDIT_BORN_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const result = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const handleAddAuthor = (event) => {
    event.preventDefault()
    if (!selectedAuthor) return null
    if (!birthYear) return null
    changeAuthor({
      variables: { name: selectedAuthor, setBornTo: parseInt(birthYear) },
    })
    setSelectedAuthor('')
    setBirthYear('')
  }

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Set Birth Year</h3>
        <form
          onSubmit={handleAddAuthor}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label>
            Name:
            <select
              value={selectedAuthor}
              onChange={(event) => setSelectedAuthor(event.target.value)}
            >
              <option default value="">
                Select Author...
              </option>
              {authors.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Birth Year
            <input
              type="number"
              value={birthYear}
              onChange={(event) => setBirthYear(event.target.value)}
            />
          </label>
          <button style={{ alignSelf: 'flex-start' }} type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Authors
