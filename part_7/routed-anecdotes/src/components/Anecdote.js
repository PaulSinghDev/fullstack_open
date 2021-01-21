import React from 'react'

const Anecdote = ({ anecdote }) => (
  <div className="anecdote-info">
    <p>{anecdote.content}</p>
    <p>{anecdote.author}</p>
    <p>{anecdote.info}</p>
    <p>{anecdote.votes}</p>
  </div>
)

export default Anecdote
