import React, { useEffect } from 'react'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from '../reducers/bloglistReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.bloglist)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  return blogs.length > 0 ? (
    <ul
      className="blog-list"
      style={{ listStyle: 'none', margin: 0, padding: 0 }}
    >
      {blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </ul>
  ) : (
    <p>No blogs to display.</p>
  )
}

export default BlogList
