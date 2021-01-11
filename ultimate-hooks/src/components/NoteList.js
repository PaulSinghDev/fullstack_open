import React, { useEffect } from 'react'
import { useResource } from '../hooks'

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
