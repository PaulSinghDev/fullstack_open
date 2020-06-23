/* eslint-disable no-useless-catch */
require('dotenv').config()
const Person = require('../models/Person')

const getPeople = async () => {
  try {
    console.log('Getting all entries in the phone book')
    const persons = await Person.find({})
    return persons
  } catch (error) {
    throw error
  } finally {
    console.log('Finished querying database')
  }
}
const getPersonById = async (id) => {
  try {
    console.log(`Looking for entry with the ID ${id}`)
    const person = await Person.findById(id)
    return person
  } catch (error) {
    throw error
  } finally {
    console.log('Finished querying database')
  }
}
const getPersonByQuery = async (query) => {
  try {
    console.log('Searching for record by query')
    const person = await Person.find(query)
    return person
  } catch (error) {
    throw error
  } finally {
    console.log('Finished database operations')
  }
}
const deletePerson = async (id) => {
  try {
    console.log(`Deleting the entry with the ID ${id}`)
    const deletedPerson = await Person.findByIdAndDelete(id)
    return deletedPerson
  } catch (error) {
    throw error
  } finally {
    console.log('Finished database operations')
  }
}
const createPerson = async (person) => {
  try {
    console.log('Writing new record to the database')
    const document = await new Person(person).save()
    return document
  } catch (error) {
    throw error
  } finally {
    console.log('Finished database operations')
  }
}
const updatePerson = async (id, person) => {
  try {
    console.log(`Searching for person with the ID ${id}`)
    console.log(person)
    const alteredPerson = await Person.findByIdAndUpdate(id, person, {
      new: true,
      runValidators: true,
      context: 'query'
    })
    console.log('record')
    return alteredPerson
  } catch (error) {
    console.log('error')
    throw error
  } finally {
    console.log('Finished database operations')
  }
}

module.exports = {
  getPeople,
  getPersonById,
  deletePerson,
  createPerson,
  getPersonByQuery,
  updatePerson,
}
