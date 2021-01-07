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

  useEffect(() => {
    const localUser = loginService.checkForToken()
    if (localUser) {
      setUser(localUser)
      blogService.setToken(localUser.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const login = async (details) => {
    try {
      const loggedInUser = await loginService.login(details)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
      const blogList = await blogService.getByUsername(loggedInUser.username)
      setBlogs(blogList)
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
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
    loginService.logout()
    setMessage('You have been logged out')
    setTimeout(() => setMessage(''), 5000)
  }

  const createBlog = (newBlog) => {
    newBlogForm.current.toggleVisibility()
    blogService.create(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage('Blog created successfully')
    })
  }

  const modalPopup = (message, type) => {
    const style = {
      border: `1px solid ${type === 'error' ? 'red' : 'green'}`,
      padding: '1rem',
      margin: '1rem',
      display: 'inline-block',
      backgroundColor: 'rgba(0,0,0,0.1)',
    }
    return (
      <div className="notification-modal" style={style}>
        {message}
      </div>
    )
  }

  const deleteBlog = async (id) => {
    if (window.confirm('Are you sure you with to delete the post?')) {
      try {
        const response = await blogService.remove(id)
        const newBlogsList = blogs.filter((blog) => blog.id !== id)
        setBlogs(newBlogsList)
      } catch (error) {
        if (error.response.status === 401) {
          setErrorMessage(error.response.data.error)
          setTimeout(() => setErrorMessage(''), 5000)
        }
      }
    }
  }

  return (
    <div style={{ fontFamily: 'roboto', textAlign: 'center' }}>
      <h1>Simple Blog List</h1>
      {message ? modalPopup(message, 'info') : null}
      {errorMessage ? modalPopup(errorMessage, 'error') : null}

      {user === null && (
        <div style={{ margin: '4rem 2rem' }}>
          <h2>You're Currently Logged Out</h2>
          <Togglable buttonLabel="Show Login">
            <LoginForm login={login} />
          </Togglable>
        </div>
      )}

      {user !== null && (
        <div className="account-information" style={{ margin: '4rem 2rem' }}>
          <h2>Your account</h2>
          <p>
            You are logged in as <strong>{user.username}</strong>
          </p>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          <Togglable buttonLabel="New Blog" ref={newBlogForm}>
            <NewBlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}
      <BlogList title="All Blog Posts" blogs={blogs} deleteBlog={deleteBlog} />
    </div>
  )
}

export default App
