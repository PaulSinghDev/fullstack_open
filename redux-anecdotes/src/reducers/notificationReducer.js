export const setNotification = (notification, timeout) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: notification })
    await setTimeout(() => {
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
