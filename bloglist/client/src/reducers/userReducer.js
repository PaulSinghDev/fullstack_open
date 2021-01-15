import userService from '../services/users'

export const getUserInfo = (id) => {
  return async (dispatch) => {
    try {
      const user = await userService.getById(id)
      dispatch({
        type: 'GET_USER_INFO',
        payload: {
          user: user,
        },
      })
    } catch (error) {
      dispatch({ type: 'GET_USER_INFO_FAILED' })
    }
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_USER_INFO':
      return action.payload.user
    default:
      return state
  }
}

export default userReducer
