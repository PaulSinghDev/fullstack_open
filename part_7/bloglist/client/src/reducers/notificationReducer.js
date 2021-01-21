let timerId

export const resetTimer = (dispatch, timeout) => {
  if (timerId) {
    clearTimeout(timerId)
    timeout *= 0.5
  }
  timerId = setTimeout(() => {
    dispatch({ type: 'RESET_NOTIFICATION' })
  }, 1000 * timeout)
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'LIKE_BLOG':
      return {
        type: 'message',
        message: `You liked '${action.payload.title}'`,
      }
    case 'LOGIN_USER':
      resetTimer(state, 10)
      return {
        type: 'message',
        message: `You have logged in as '${action.payload.auth.username}'`,
      }
    case 'LOGIN_FAILED':
      return {
        type: 'error',
        message: 'Failed to log you in',
      }
    case 'LOGOUT_USER':
      return {
        type: 'message',
        message: 'Your have been successfully logged out.',
      }
    case 'REGISTER_USER':
      return {
        type: 'message',
        message: `You have been registered and logged in as '${action.payload.auth.username}'`,
      }
    case 'DELETE_USER':
      return {
        type: 'message',
        message: 'You have been deleted',
      }
    case 'CREATE_BLOG':
      return {
        type: 'message',
        message: `You successfully posted '${action.payload.title}'`,
      }
    case 'DELETE_BLOG':
      console.log(action.payload)
      return {
        type: 'message',
        message: `Post deleted'`,
      }
    case 'DELETE_POST_FAIL':
      return { type: 'error', message: action.payload }
    case 'RESET_NOTIFICATION':
      return null
    default:
      return null
  }
}

export default notificationReducer
