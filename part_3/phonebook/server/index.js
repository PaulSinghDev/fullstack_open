/* global process */
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('./modules/errorHandler')
const unknownPath = require('./modules/unknownPath')

morgan.token('body', (request) => JSON.stringify(request.body) !== '{}' ? JSON.stringify(request.body) : ' ')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

require('./routes/routes')(app)

app.use(unknownPath)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT)

console.log(`Server listening on port ${PORT}`)
