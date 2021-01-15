import React, { useEffect } from 'react'
import { getUserInfo } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const User = ({ id }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(getUserInfo(id))
  }, [dispatch, id])

  return (
    <div className="user-wrapper">
      <div className="user-card">
        <h2>{user && user.name}</h2>
      </div>
    </div>
  )
}

export default User
