import userService from '../services/users'

export const initUserlist = () => {
  return async (dispatch) => {
    try {
      const userlist = await userService.getAllUsers()
      console.log(userlist)
      dispatch({
        type: 'INIT_USERLIST',
        payload: {
          userlist,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USERLIST':
      return action.payload.userlist
    default:
      return state
  }
}

export default userReducer
