import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const Blog = ({ blog, deleteBlog }) => {
  const [likes, setLikes] = useState(blog.likes)

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
    <li
      style={{
        padding: 5,
        fontSize: 16,
        textTransform: 'capitalize',
        margin: 0,
      }}
      className="blog"
    >
      <p style={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.9)', fontSize: 16 }}>
        {blog.title} -{' '}
        <span
          style={{ fontWeight: 'normal', fontStyle: 'italic', fontSize: 12 }}
        >
          {blog.author}
        </span>
      </p>
      <Togglable buttonLabel="Show More...">
        <div
          className="blog-details"
          style={{
            flexDirection: 'column',
          }}
        >
          <p style={{ fontSize: 12 }}>
            URL: <a href="{blog.url}">{blog.url}</a>
          </p>
          <p>
            Likes: {likes}
            <button className="like-button" onClick={likePost}>
              Like
            </button>
          </p>
          <button className="delete-blog" onClick={deletePost}>
            Delete
          </button>
        </div>
      </Togglable>
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
