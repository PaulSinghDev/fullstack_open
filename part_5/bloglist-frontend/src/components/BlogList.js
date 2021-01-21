import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ title, blogs, deleteBlog }) => {
  return (
    <div className="blog-list" style={{ textAlign: 'center' }}>
      <h2>{title}</h2>
      {blogs.length > 0 ? (
        <ul
          className="blog-list"
          style={{ listStyle: 'none', margin: 0, padding: 0 }}
        >
          {blogs
            .sort((a, b) => (a.likes > b.likes ? -1 : 1))
            .map((blog) => (
              <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />
            ))}
        </ul>
      ) : (
        <p>No blogs to display.</p>
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default BlogList
