import React from 'react'

const PeopleList = ({ people }) => {
  return (
    <ul>
      {people.map((n) => (
        <li key={n.id}>
          {n.name} {n.number}
        </li>
      ))}
    </ul>
  )
}

export default PeopleList
