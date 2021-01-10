import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const createNoteHandler = (event) => {
    event.preventDefault()
    const content = event.target.new_anecdote.value
    dispatch(create(content))
  }
  return (
    <div className="anecdote-form">
      <h2>create new</h2>
      <form onSubmit={createNoteHandler}>
        <div>
          <input name="new_anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
