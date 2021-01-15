import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => (
  <li className="blog-list-item">
    <Link to={`/blogs/${blog.id}`}>
      <h3>
        {blog.title} - <span className="author">{blog.author}</span>
      </h3>
    </Link>
  </li>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
