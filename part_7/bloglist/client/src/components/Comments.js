import React, { useEffect, useState } from 'react'
import CommentForm from './forms/CommentForm'

const Comments = ({ blog }) => {
  let comments = blog.comments
  return (
    <div className="comments-wrapper">
      <CommentForm blogId={blog.id} />
      <div className="comment-list-container">
        <h3>Comments</h3>
        {comments && comments.length > 0 ? (
          <ul className="comments-list">
            {comments.map((comment) => (
              <li key={comment.id}>{comment.comment}</li>
            ))}
          </ul>
        ) : (
          <p>No comments to display. Be the first to comment.</p>
        )}
      </div>
    </div>
  )
}

export default Comments
