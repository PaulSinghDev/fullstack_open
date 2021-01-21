import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getById, likeBlog, deleteBlog } from '../reducers/bloglistReducer'
import Comments from './Comments'

const BlogPage = ({ id }) => {
  const blog = useSelector((state) => state.bloglist)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getById(id))
  }, [dispatch])

  const handleLike = () => {
    dispatch(likeBlog(blog[0]))
  }

  const handleDelete = () => {
    dispatch(deleteBlog(id))
  }

  return !blog[0] ? (
    <p>No data loaded</p>
  ) : (
    <div className="blog-page-wrapper">
      <div className="blog-page-item">
        <h2>{blog[0].title}</h2>
        <div className="details">
          <p>
            <span>Likes:</span>
            {blog[0].likes}
          </p>
          <p>
            <span>URL:</span>
            {blog[0].url}
          </p>
          <p>
            <span>Author:</span>
            {blog[0].author}
          </p>
          <p>
            <span>Added by:</span>
            <Link to={`/user/${blog[0].user.id}`}>{blog[0].user.name}</Link>
          </p>
          <p>
            <span>Created On:</span>
            {new Date(blog[0].created).toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="buttons">
          <button type="button" onClick={handleLike}>
            Like
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <Comments blog={blog[0]} />
    </div>
  )
}

export default BlogPage
