import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  return (
    <div className="anecdote-filter">
      <h3>Filter Results</h3>
      <input
        name="filter"
        type="text"
        onChange={({ target }) => dispatch(setFilter(target.value))}
      />
    </div>
  )
}

export default AnecdoteFilter
