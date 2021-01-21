const testRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

testRouter.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Comment.deleteMany({})
  return res.status(204).end()
})

module.exports = testRouter
