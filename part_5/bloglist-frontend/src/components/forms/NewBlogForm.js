import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const inputStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: '0.5rem auto',
    maxWidth: 300,
  }

  return (
    <div className="new-blog-form">
      <form onSubmit={handleSubmit} style={{ margin: '2rem 1rem' }}>
        <div className="form-input" style={inputStyle}>
          <label>Title</label>
          <input
            id="new-blog-title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="form-input" style={inputStyle}>
          <label>Author</label>
          <input
            id="new-blog-author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="form-input" style={inputStyle}>
          <label>URL</label>
          <input
            id="new-blog-url"
            type="url"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submit-blog" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default NewBlogForm
