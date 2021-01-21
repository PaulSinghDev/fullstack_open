import anecdoteService from '../services/anecdotes'

export const vote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      payload: {
        ...updatedAnecdote,
      },
    })
  }
}

export const create = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      payload: {
        ...newAnecdote,
      },
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      payload: { anecdotes },
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.payload.anecdotes
    case 'VOTE':
      const anecdote = action.payload
      return state.map((item) => (item.id !== anecdote.id ? item : anecdote))
    case 'CREATE':
      return state.concat(action.payload)
    default:
      return state
  }
}

export default anecdoteReducer
