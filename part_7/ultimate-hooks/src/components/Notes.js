import React from 'react'
import CreateNote from './CreateNote'
import NoteList from './NoteList'
import { useResource } from '../hooks'
const Notes = () => {
  const [notes, noteService] = useResource('http://localhost:3005/notes')

  return (
    <section className="notes-wrapper">
      <h2>Notes</h2>
      <CreateNote noteService={noteService} />
      <NoteList notes={notes} />
    </section>
  )
}

export default Notes
