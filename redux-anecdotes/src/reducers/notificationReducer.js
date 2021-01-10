export const notifyVote = (notification) => {
  return {
    type: 'NOTIFY_VOTE',
    payload: { notification },
  }
}

export const notifyCreate = (notification) => {
  return {
    type: 'NOTIFY_CREATE',
    payload: {
      notification,
    },
  }
}

export const notifyReset = () => {
  return {
    type: 'RESET',
    payload: {},
  }
}

const notificationReducer = (state = 'NONE', action) => {
  const payload = action.payload
  switch (action.type) {
    case 'NOTIFY_VOTE':
      return `You voted for '${payload.notification}'!`
    case 'NOTIFY_CREATE':
      return `You created the following anecdote: ${payload.notification}`
    case 'RESET':
      return 'NONE'
    default:
      return state
  }
}

export default notificationReducer
