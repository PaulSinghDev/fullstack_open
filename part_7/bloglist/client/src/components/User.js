import React, { useEffect } from 'react'
import { getUserInfo } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import UserCard from './UserCard'

const User = ({ id }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUserInfo(id))
  }, [dispatch, id])

  return (
    <>
      <UserCard user={user} />
      <div className="blog-list-wrapper">
        <h3>Blogs</h3>

        {user && user.blogs.length > 0 ? (
          <ul
            className="blog-list"
            style={{ listStyle: 'none', margin: 0, padding: 0 }}
          >
            {user.blogs
              .sort((a, b) => (a.likes > b.likes ? -1 : 1))
              .map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
          </ul>
        ) : (
          <p>No blogs to display.</p>
        )}
      </div>
    </>
  )
}

export default User
