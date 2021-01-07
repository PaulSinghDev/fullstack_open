import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ username, password })
    setUsername('')
    setPassword('')
  }

  const inputStyle = {
    margin: '0.5rem auto',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 300,
  }

  return (
    <div
      className="login-form"
      style={{ textAlign: 'center', margin: '3rem 1rem' }}
    >
      <h2>Login</h2>
      <p>Login to create, delete and view your own blog posts</p>
      <form onSubmit={handleSubmit}>
        <div className="form-input" style={inputStyle}>
          <label>Username</label>
          <input
            id="form-login-username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="form-input" style={inputStyle}>
          <label>Password</label>
          <input
            id="form-login-password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-submit" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginForm
