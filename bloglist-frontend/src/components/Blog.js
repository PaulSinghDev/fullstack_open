import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleDetails = () => setShowDetails(!showDetails)
  const likePost = async (event) => {
    event.preventDefault()
    await blogService.update({ ...blog, likes: likes + 1 })
    setLikes(likes + 1)
  }

  const deletePost = async (event) => {
    event.preventDefault()
    await deleteBlog(blog.id)
  }

  return (
    <div
      style={{
        padding: 5,
        margin: 5,
        fontSize: 16,
        textTransform: 'capitalize',
      }}
    >
      <p style={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.9)', fontSize: 16 }}>
        {blog.title} -{' '}
        <span
          style={{ fontWeight: 'normal', fontStyle: 'italic', fontSize: 12 }}
        >
          {blog.author}
        </span>
      </p>
      <button onClick={toggleDetails}>
        {showDetails ? 'Hide' : 'Show'} Details
      </button>
      <div
        style={{
          display: showDetails ? 'flex' : 'none',
          flexDirection: 'column',
        }}
      >
        <p style={{ fontSize: 12 }}>
          URL: <a href="{blog.url}">{blog.url}</a>
        </p>
        <p>
          Likes: {likes}
          <button onClick={likePost}>Like</button>
        </p>
        <button onClick={deletePost}>Delete</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
