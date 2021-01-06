import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, deleteBlog }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />
        ))}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default BlogList
