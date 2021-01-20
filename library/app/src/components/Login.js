import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries/auth'
import { useMutation } from '@apollo/client'

const Login = ({ show, setToken, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (err) => setError(err.graphQLErrors[0].message),
  })

  const handleLogin = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-data', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!show) return null

  return (
    <div className="">
      <form onSubmit={handleLogin}>
        <div className="form-input">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="form-input">
          <label>Password</label>
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
