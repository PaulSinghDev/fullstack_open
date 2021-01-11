import React from 'react'
import { useField } from '../hooks'

const CreateNote = ({ noteService }) => {
  const content = useField('text')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  return (
    <form onSubmit={handleNoteSubmit}>
      <input {...content} />
      <button>create</button>
    </form>
  )
}

export default CreateNote
