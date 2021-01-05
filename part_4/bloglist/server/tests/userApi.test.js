const helper = require('./testHelper')
const app = require('../app')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await helper.dbConnect()
  await User.deleteMany({ username: { $nin: ['dbtest', 'root'] } })
  const passwordHash = await bcrypt.hash('pass', 10)
  const originalRoot = User.find({ username: 'root' })
  if (!originalRoot) {
    const user = {
      username: 'root',
      name: 'Super User',
      passwordHash,
    }
    await new User(user).save()
  }
})

afterEach(async () => {
  await helper.dbClose()
})

describe('user db tests', () => {
  test('add one user', async () => {
    const usersBefore = await helper.usersInDb()
    const user = await helper.createNewUser('bob', 'pass', 'Bob')
    const usersAfter = await helper.usersInDb()
    const usernames = usersAfter.map((user) => user.username)
    expect(usernames).toContain(user.username)
    expect(usersAfter).toHaveLength(usersBefore.length + 1)
  })
})

describe('user api tests', () => {
  test('add one user', async () => {
    const usersBefore = await helper.usersInDb()
    const user = { username: 'fred', name: 'Fred B', password: 'pass' }
    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const usersAfter = await helper.usersInDb()
    const usernames = usersAfter.map((user) => user.username)
    expect(usernames).toContain(user.username)
    expect(usersAfter).toHaveLength(usersBefore.length + 1)
  })

  test('no username', async () => {
    const usersAtTheStart = await helper.usersInDb()
    const user = {
      password: 'pass',
      name: 'No Username',
    }
    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersAtTheStart.length)
    expect(response.body.error).toBeDefined()
  })

  test('no password', async () => {
    const usersAtTheStart = await helper.usersInDb()
    const user = {
      username: 'nopass',
      name: 'No Username',
    }
    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersAtTheStart.length)
    expect(response.body.error).toBeDefined()
  })

  test('duplicate user', async () => {
    const usersAtTheStart = await helper.usersInDb()
    const user = {
      username: 'root',
      password: 'pass',
      name: 'Duplicate Username',
    }
    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersAtTheStart.length)
    expect(response.body.error).toBeDefined()
  })

  test('update name', async () => {
    const savedUser = await helper.createNewUser(
      'indecisive',
      'pass',
      'Likes to Change'
    )

    const editedObject = {
      username: savedUser.username,
      password: 'pass',
      name: 'Deed Poll',
    }
    const token = await helper.getJwtToken(api, 'indecisive', 'pass')
    const updatedUser = (
      await api
        .put(`/api/users/${savedUser._id}`)
        .send(editedObject)
        .set('authorization', `bearer ${token}`)
        .expect(200)
    ).body

    expect(updatedUser.name).toEqual(editedObject.name)
  })

  test('update no token', async () => {
    const user = await helper.createNewUser(
      'indecisive',
      'pass',
      'Likes to Change'
    )
    const editedObject = {
      username: user.username,
      password: 'pass',
      name: 'Deed Poll',
    }
    await api.put(`/api/users/${user._id}`).send(editedObject).expect(401)
  })

  test('delete user', async () => {})
})
