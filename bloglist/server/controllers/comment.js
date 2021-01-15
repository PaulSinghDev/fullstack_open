const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const User = require('../models/user')

commentsRouter.get('/', async (req, res) => {
  const comments = await Comment.find({}).populate('blog', {
    likes: 1,
    id: 1,
    title: 1,
    author: 1,
    urls: 1,
    user: 1,
  })
  return res.status(200).json(comments)
})

module.exports = commentsRouter
