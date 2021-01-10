import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { notifyCreate, notifyReset } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNoteHandler = async (event) => {
    event.preventDefault()
    const content = event.target.new_anecdote.value
    event.target.new_anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
    dispatch(notifyCreate(content))
    setTimeout(() => {
      dispatch(notifyReset())
    }, 5000)
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
