const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    id: 1,
    title: 1,
    url: 1,
    author: 1,
    likes: 1,
  })
  return res.json(users)
})

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('blogs', {
    id: 1,
    title: 1,
    url: 1,
    author: 1,
    likes: 1,
  })
  if (!user)
    return res.status(404).json({ error: 'No user found with that ID' })
  return res.status(200).json(user)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
  console.log(req.body)
  if (!username || !password)
    return res.status(400).json({ error: 'Must enter a password and username' })
  if (username.length < 3 || password.length < 3)
    return res
      .status(400)
      .json({ error: 'Password and username must be at least 3 characters' })

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  const token = jwt.sign(
    { username: savedUser.userName, id: savedUser.id },
    process.env.SECRET
  )
  savedUser.token = token
  return res.json(savedUser.toJSON())
})

usersRouter.delete(
  '/:id',
  middleware.authenticateJwtToken,
  async (req, res) => {
    await req.user.remove()
    return res.status(200).json({ message: 'User deleted' })
  }
)

usersRouter.put('/:id', middleware.authenticateJwtToken, async (req, res) => {
  const user = req.user
  const body = req.body
  let passwordHash = null

  if (body.password) {
    if (body.password.length < 3)
      return res.status(400).json({
        error: 'Your password should be at least three character in length',
      })

    passwordHash = await bcrypt.hash(body.password, 10)

    if (passwordHash !== user.passwordHash) {
      user.passwordHash = passwordHash
    }
  }

  if (body.username !== user.username) {
    if (body.username.length < 3)
      return res.status(400).json({
        error: 'Your new username should be at least 3 characters long',
      })

    const usernameExists = User.find({ username: body.username })
    if (usernameExists)
      return res
        .status(400)
        .json({ error: 'Your new username has already been taken' })

    user.username = body.username
  }

  if (body.name) {
    if (body.name !== user.name) {
      user.name = body.name
    }
  }

  user.blogs = body.blogs ? body.blogs : user.blogs

  const savedUser = await user.save()

  return res.status(200).json(savedUser.toJSON())
})

module.exports = usersRouter
