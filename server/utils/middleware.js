const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:', req.body)
  logger.info('-----------------')
  return next()
}

const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'Invalid token',
    })
  }

  next(error)
}

const getJwtToken = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring('7')
    return next()
  }

  return next()
}

const authenticateJwtToken = async (req, res, next) => {
  const token = req.token
  const id = req.params.id

  if (!token) return res.status(401).json({ error: 'No token provided' })
  if (!id) return res.status(401).json({ error: 'No user ID provided' })

  const user = (await User.findById(id)) || (await User.find({ username: id }))
  if (!user) return res.status(404).json({ error: 'No user with that ID' })

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (user._id.toString() !== decodedToken.id.toString())
    return res.status(401).json({ error: 'Invalid auth token' })

  req.authenticated = true
  req.user = user
  return next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getJwtToken,
  authenticateJwtToken,
}
