import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === 'NONE') {
      return state.anecdotes
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    )
  }).sort((a, b) => (a.votes > b.votes ? -1 : 1))

  const dispatch = useDispatch()

  const voteHandler = (id) => {
    const anecdoteObject = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch(vote(id))
    dispatch(setNotification(`You voted for '${anecdoteObject.content}'`, 10))
  }

  return (
    <div className="anecdote-list">
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
