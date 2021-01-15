import React from 'react'
import PropTypes from 'prop-types'
import Logout from './forms/Logout'
import { Link, useHistory } from 'react-router-dom'

const LoggedIn = ({ username, id }) => {
  const history = useHistory()

  return (
    <div className="logged-in-view">
      <span>
        Logged in as{' '}
        <Link
          to={`/user/${id}`}
          onClick={(e) => {
            e.preventDefault()
          }}
          className="has-tooltip"
        >
          {username}
          <div className="tooltip-dropdown">
            <button onClick={() => history.push(`/user/${id}`)}>
              Dashboard
            </button>
            <button onClick={() => history.push(`/blogs/new`)}>New Blog</button>
            <Logout />
          </div>
        </Link>
      </span>
    </div>
  )
}

LoggedIn.propTypes = {
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default LoggedIn
