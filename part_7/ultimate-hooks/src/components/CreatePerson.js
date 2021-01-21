import React from 'react'
import { useField } from '../hooks'

const CreatePerson = ({ personService }) => {
  const name = useField('text')
  const number = useField('number')

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

  return (
    <form onSubmit={handlePersonSubmit}>
      name <input {...name} /> <br />
      number <input {...number} />
      <button type="submit">create</button>
    </form>
  )
}

export default CreatePerson
