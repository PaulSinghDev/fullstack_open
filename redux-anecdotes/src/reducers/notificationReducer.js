export const setNotification = (notification, timeout) => {
  let timeoutId
  return async (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeout *= 0.5
    }
    dispatch({ type: 'SET_NOTIFICATION', payload: notification })
    timeoutId = setTimeout(() => {
      dispatch({ type: 'RESET', payload: '' })
    }, timeout * 1000)
  }
}

export const notifyReset = () => {
  return {
    type: 'RESET',
    payload: {},
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'RESET':
      return ''
    default:
      return state
  }
}

export default notificationReducer
