import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initUserlist } from '../reducers/userlistReducer'

const Users = () => {
  const dispatch = useDispatch()
  const userlist = useSelector((state) => state.userlist)
  useEffect(() => {
    dispatch(initUserlist())
  }, [dispatch])

  return (
    <div className="userlist-wrapper">
      <h2>All Users</h2>
      {userlist && userlist.length > 0 ? (
        <ul className="userlist-list">
          {userlist &&
            userlist.map((user) => (
              <li className="userlist-item" key={user.id}>
                <Link to={`/user/${user.id}`}>
                  <h3>{user.name}</h3>
                </Link>
                <p>({user.username})</p>
                <p>Posts: {user.blogs.length}</p>
              </li>
            ))}
        </ul>
      ) : (
        <p>
          No users currently registeres.{' '}
          <Link to="/register">Create an account</Link>.
        </p>
      )}
    </div>
  )
}

export default Users
