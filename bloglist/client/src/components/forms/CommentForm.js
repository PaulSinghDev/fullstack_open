import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks/'
import { postComment } from '../../reducers/bloglistReducer'

const CommentForm = ({ blogId }) => {
  const comment = useField('text', 'comment')
  const { reset: resetComment, ...commentOptions } = comment
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(postComment(blogId, comment.value))
    resetComment()
  }

  return (
    <div className="new-comment-form" aria-hidden="true">
      <h3>New Comment</h3>
      <form onSubmit={handleSubmit}>
        <div
          className="form-input"
          data-has-content={comment.value ? 'true' : 'false'}
        >
          <label>Comment</label>
          <input id="new-comment" {...commentOptions} />
        </div>

        <button id="submit-blog" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default CommentForm
