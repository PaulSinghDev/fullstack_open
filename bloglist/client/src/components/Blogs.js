import React from 'react'
import BlogList from './BlogList'

const Blogs = () => {
  return (
    <div className="blog-list-wrapper" style={{ textAlign: 'center' }}>
      <h2>All Blog Posts</h2>
      <BlogList />
    </div>
  )
}

export default Blogs
