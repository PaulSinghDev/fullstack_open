import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../reducers/authReducer'

const Logout = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }
  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  )
}

export default Logout
