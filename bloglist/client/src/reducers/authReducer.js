import userService from '../services/users'
import { resetTimer } from './notificationReducer'

export const registerUser = (user) => {
  return async (dispatch) => {
    const payload = await userService.register(user)
    dispatch({
      type: 'REGISTER_USER',
      payload: {
        auth: payload,
      },
    })
    resetTimer(dispatch, 10)
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    userService.logout()
    dispatch({ type: 'LOGOUT_USER' })
    resetTimer(dispatch, 10)
  }
}

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const payload = await userService.login(user)
      dispatch({
        type: 'LOGIN_USER',
        payload: {
          auth: payload,
        },
      })
      resetTimer(dispatch, 10)
    } catch ({ response }) {
      dispatch({
        type: 'LOGIN_FAILED',
        payload: {
          type: 'error',
          message: response.data.error,
        },
      })
      resetTimer(dispatch, 10)
    }
  }
}

export const deleteUser = (user) => {
  return async (dispatch) => {
    await userService.remove(user)
    dispatch({
      type: 'DELETE_USER',
    })
    resetTimer(dispatch, 10)
  }
}

export const initUser = () => {
  return async (dispatch) => {
    const payload = await userService.checkForToken()

    if (!payload) return

    userService.setToken(payload.token)
    dispatch({
      type: 'INIT_USER',
      payload: {
        auth: payload,
      },
    })
  }
}

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAllUsers()
      dispatch({
        type: 'GET_ALL_USERS',
        payload: {
          users,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
}

const authReducer = (state = null, action) => {
  switch (action.type) {
    case 'DELETE_USER':
      return null
    case 'REGISTER_USER':
      return action.payload.auth
    case 'LOGIN_USER':
      return action.payload.auth
    case 'INIT_USER':
      return action.payload.auth
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export default authReducer
