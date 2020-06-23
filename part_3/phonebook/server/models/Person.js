/* global process */
require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const MONGO_URI = process.env.MONGO_URI

mongoose.set('useFindAndModify', false)
mongoose.plugin(uniqueValidator)

console.log('Connecting to Mongo DB')
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Mongo DB')
  })
  .catch(error => console.log(`Error connecting to Mongo DB: ${error.message}`))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true,
    minlength: 5,
    unique: true
  },
  date: {
    type: Date,
    required: true,
    default: new Date()
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedDocument) => {
    returnedDocument.id = returnedDocument._id
    delete returnedDocument._id
    delete returnedDocument.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
