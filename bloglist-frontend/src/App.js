import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const localUser = loginService.checkForToken()

    if (localUser) {
      setUser(localUser)
      blogService.setToken(localUser.token)
      blogService
        .getByUsername(localUser.username)
        .then((data) => setBlogs(data))
    }

    setTimeout(() => setMessage(''), 5000)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      blogService.getByUsername(user.username).then((data) => setBlogs(data))
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setPassword('')
      setUsername('')
      setMessage('You have been logged in')
      setTimeout(() => setMessage(''), 5000)
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setBlogs([])
    setAuthor('')
    setTitle('')
    setUrl('')
    loginService.logout()
    setMessage('You have been logged out')
    setTimeout(() => setMessage(''), 5000)
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({ title, author, url })
      const newBlogs = blogs.concat(blog)
      setBlogs(newBlogs)
      setAuthor('')
      setTitle('')
      setUrl('')
      setMessage('Blog created successfully')
      setTimeout(() => setMessage(''), 5000)
    } catch (error) {
      console.log(error)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const blogList = () => (
    <>
      <h2>Blogs</h2>
      Currently logged in as {user.username}
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )

  const blogForm = () => (
    <form onSubmit={handleBlogSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label>URL</label>
        <input
          type="url"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )

  const modalPopup = (message, type) => {
    const style = {
      border: `1px solid ${type === 'error' ? 'red' : 'green'}`,
      padding: '1rem',
      margin: '1rem',
      display: 'inline-block',
      backgroundColor: `rgba(0,0,0,0.1)`,
    }
    return (
      <div className="" style={style}>
        {message}
      </div>
    )
  }

  return (
    <div>
      {user ? blogForm() : loginForm()}
      {message ? modalPopup(message, 'info') : null}
      {errorMessage ? modalPopup(errorMessage, 'error') : null}
      {user !== null && blogList()}
    </div>
  )
}

export default App
