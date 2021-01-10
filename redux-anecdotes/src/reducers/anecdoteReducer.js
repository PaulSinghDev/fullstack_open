import { asObject } from './reducer_helper'

export const vote = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id,
    },
  }
}

export const create = (content) => {
  return {
    type: 'CREATE',
    payload: {
      content,
    },
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    payload: { anecdotes },
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.payload.anecdotes
    case 'VOTE':
      const id = action.payload.id
      const anecdote = state.find((item) => item.id === id)
      return state.map((item) =>
        item.id !== id ? item : { ...anecdote, votes: anecdote.votes + 1 }
      )
    case 'CREATE':
      return state.concat(action.payload.content)
    default:
      return state
  }
}

export default anecdoteReducer
