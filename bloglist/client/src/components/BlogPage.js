import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getById } from '../reducers/bloglistReducer'
import Comments from './Comments'

const BlogPage = ({ id }) => {
  const blog = useSelector((state) => state.bloglist[0])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getById(id))
  }, [dispatch, id])

  return !blog ? (
    <p>No data loaded</p>
  ) : (
    <div className="blog-page-wrapper">
      <div className="blog-page-item">
        <h2>{blog.title}</h2>
        <div className="details">
          <p>Likes: {blog.likes}</p>
          <p>URL: {blog.url}</p>
          <p>Author: {blog.author} </p>
          <p>
            Added by <Link to={`/user/${blog.user.id}`}>{blog.user.name}</Link>
          </p>
        </div>
      </div>
      <Comments />
    </div>
  )
}

export default BlogPage
