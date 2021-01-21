import React from 'react'
import CreatePerson from './CreatePerson'
import PeopleList from './PeopleList'
import { useResource } from '../hooks'

const People = () => {
  const [people, peopleService] = useResource('http://localhost:3005/persons')

  return (
    <section className="people-wrapper">
      <h2>People</h2>
      <CreatePerson personService={peopleService} />
      <PeopleList people={people} />
    </section>
  )
}

export default People
