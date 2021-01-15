import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initUser } from '../reducers/authReducer'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  return (
    <div id="navigation" className="main-menu">
      <div className="menu-links">
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
      </div>
      {user ? (
        <LoggedIn username={user.username} id={user.id} />
      ) : (
        <LoggedOut />
      )}
    </div>
  )
}

export default Navigation
