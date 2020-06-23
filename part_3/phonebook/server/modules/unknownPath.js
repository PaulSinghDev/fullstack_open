module.exports = (request, response) => {
  return response
    .status(404)
    .send({ error: 'The path specified is not recognised by the server' })
}
