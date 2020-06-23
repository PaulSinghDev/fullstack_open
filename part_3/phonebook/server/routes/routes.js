const {
  getPeople,
  getPersonById,
  deletePerson,
  createPerson,
  updatePerson,
} = require('../db/mongoFunctions')

module.exports = function (app) {
  app.get('/api/persons', async (request, response, next) => {
    try {
      const people = await getPeople()
      return response.json(people)
    } catch (error) {
      return next(error)
    }
  })
  app.get('/info', async (request, response, next) => {
    try {
      const date = new Date().toLocaleString()
      const people = await getPeople()
      return response.send(
        `The phone book currently has information for ${people.length} people. \n ${date}`
      )
    } catch (error) {
      return next(error)
    }
  })
  app.get('/api/persons/:id', async (request, response, next) => {
    try {
      const id = request.params.id
      if (!id) {
        return response.json({
          error: 'No ID was provided',
        })
      }
      const person = await getPersonById(id)
      return person ? response.json(person) : response.status(404).end()
    } catch (error) {
      return next(error)
    }
  })
  app.delete('/api/persons/:id', async (request, response, next) => {
    try {
      const id = request.params.id
      if (!id) {
        return response.status(400).json({
          error: 'You did not specify an ID',
        })
      }
      const deletedPerson = await deletePerson(id)
      return deletedPerson
        ? response.status(204).end()
        : response.status(404).end()
    } catch (error) {
      return next(error)
    }
  })
  app.post('/api/persons', async (request, response, next) => {
    try {
      const { name, number } = request.body

      const newPerson = {
        name,
        number,
      }
      const person = await createPerson(newPerson)

      return response.json(person)
    } catch (error) {
      return next(error)
    }
  })
  app.put('/api/persons/:id', async (request, response, next) => {
    try {
      const id = request.params.id
      const { name, number } = request.body
      if (!id) return response.status(400).send('No ID provided')
      if (!name) return response.status(400).send('No name provided')
      if (!number) return response.status(400).send('No number provided')
      const person = {
        name,
        number,
      }
      const alteredPerson = await updatePerson(id, person)
      return alteredPerson
        ? response.json(alteredPerson)
        : response.status(404).end()
    } catch (error) {
      return next(error)
    }
  })
}