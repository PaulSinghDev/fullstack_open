import React from 'react'
import { Link } from 'react-router-dom'

const LoggedOut = () => {
  return (
    <div className="logged-out-buttons">
      <p>
        Either <Link to="/login">login</Link> or{' '}
        <Link to="/register">register</Link> to post.
      </p>
    </div>
  )
}

export default LoggedOut
