module.exports = (error, request, response, next) => {
  switch (error.name) {
  case 'CastError':
    return error.kind === 'ObjectId'
      ? response.status(400).send('Invalid ID' ).end()
      : response.status(400).send(error.message).end()
  case 'ValidationError':
    return response.status(400).send(error.message).end()
  default:
    return next(error)
  }
}
