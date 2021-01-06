import React from 'react'
import Blog from './Blog'

const BlogList = (props) => {
  return (
    <div>
      {props.blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} deleteBlog={props.deleteBlog} />
        ))}
    </div>
  )
}

export default BlogList
