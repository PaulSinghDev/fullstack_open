import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import NewBlogForm from './components/forms/NewBlogForm'
import LoginForm from './components/forms/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const newBlogForm = useRef()
  const loginFormRef = useRef()

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

  const login = async (details) => {
    try {
      const user = await loginService.login(details)
      setUser(user)
      blogService.setToken(user.token)
      const blogList = await blogService.getByUsername(user.username)
      setBlogs(blogList)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
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
    loginService.logout()
    setMessage('You have been logged out')
    setTimeout(() => setMessage(''), 5000)
  }

  const createBlog = async (newBlog) => {
    try {
      newBlogForm.current.toggleVisibility()
      const blog = await blogService.create(newBlog)
      const newBlogsList = blogs.concat(blog)
      setBlogs(newBlogsList)
      setMessage('Blog created successfully')
      setTimeout(() => setMessage(''), 5000)
    } catch (error) {
      console.log(error)
    }
  }

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

  const deleteBlog = async (id) => {
    if (window.confirm('Are you sure you with to delete the post?')) {
      await blogService.remove(id)
      const newBlogsList = blogs.filter((blog) => blog.id !== id)
      setBlogs(newBlogsList)
    }
  }

  return (
    <div style={{ fontFamily: 'roboto' }}>
      {message ? modalPopup(message, 'info') : null}
      {errorMessage ? modalPopup(errorMessage, 'error') : null}
      {user === null && (
        <Togglable label="Login" ref={loginFormRef}>
          <LoginForm login={login} />
        </Togglable>
      )}
      {user !== null && (
        <>
          <div>
            <h2>Your account</h2>
            <p>
              You are logged in as <strong>{user.username}</strong>
            </p>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <h2 style={{ textAlign: 'center' }}>Blog Posts</h2>
          <Togglable label="New Blog" ref={newBlogForm}>
            <NewBlogForm createBlog={createBlog} />
          </Togglable>
          <BlogList blogs={blogs} deleteBlog={deleteBlog} />
        </>
      )}
    </div>
  )
}

export default App
