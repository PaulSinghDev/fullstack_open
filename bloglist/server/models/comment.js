const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  comment: { type: String, minlength: 3, required: true },
  author: mongoose.Schema.Types.ObjectId,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
  date: {
    type: Date,
    default: new Date(),
  },
})

commentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id
  },
})

module.exports = mongoose.model('Comment', commentSchema)
