import React from 'react'

const NoteList = ({ notes }) => {
  return (
    <ul>
      {notes.map((n) => (
        <li key={n.id}>{n.content}</li>
      ))}
    </ul>
  )
}

export default NoteList
