const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
  const dbUser = await User.findOne({ username: username })

  const passwordCorrect =
    dbUser === null
      ? false
      : await bcrypt.compare(password, dbUser.passwordHash)

  if (!dbUser || !passwordCorrect) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const tokenUser = {
    username,
    id: dbUser._id,
  }

  const token = jwt.sign(tokenUser, process.env.SECRET)

  return res
    .status(200)
    .json({
      token,
      username: dbUser.username,
      name: dbUser.name,
      id: dbUser.id,
    })
})

module.exports = loginRouter
