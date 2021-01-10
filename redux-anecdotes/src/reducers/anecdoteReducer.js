import { getInitialState, asObject } from './reducer_helper'
export const initialState = getInitialState()

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.payload.id
      const anecdote = state.find((item) => item.id === id)
      return state.map((item) =>
        item.id !== id ? item : { ...anecdote, votes: anecdote.votes + 1 }
      )
    case 'CREATE':
      return state.concat(asObject(action.payload.content))
    default:
      return state
  }
}

export default reducer
