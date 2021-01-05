const app = require('../app')
const supertest = require('supertest')
const helper = require('./testHelper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

/**
 * Create an api variable to test the app's
 * api routes.
 */
const api = supertest(app)

/**
 * Initialise the database;
 */
beforeEach(async () => {
  await helper.dbConnect()
  await Blog.deleteMany({})
  await User.deleteOne({ username: 'dbtest' })
  const dbUser = await helper.createNewUser('dbtest', 'pass', 'DB Test')

  for (let blog of helper.initialBlogs) {
    const newBlog = new Blog(blog)
    newBlog.user = dbUser._id
    const savedBlog = await newBlog.save()
    dbUser.blogs = dbUser.blogs.concat(savedBlog._id)
    await dbUser.save()
  }
})

describe('get tests', () => {
  test('response is json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('has id field', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs[0].id).toBeDefined()
  })
  test('has all blogs', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs.length).toEqual(helper.initialBlogs.length)
  })
  test('invalid id', async () => {
    const id = await helper.nonExistingId()
    await api.get(`/api/blogs/${id}`).expect(404)
  })
  test('blog by id', async () => {
    const initialBlog = await helper.getBlogId()

    const blog = await api
      .get(`/api/blogs/${initialBlog}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blog.body.id).toEqual(initialBlog)
  })
})

// Helper function to get JWT token
const getJwtToken = async () => {
  const response = await api
    .post('/api/login/')
    .send({ username: 'dbtest', password: 'pass' })
    .expect(200)

  return response.body.token
}

describe('post tests', () => {
  test('no auth', async () => {
    const newBlog = {
      title: 'A Blog From Jest',
      author: 'Jest',
      likes: 2,
      url: 'https://makingstuffs.co.uk',
    }

    await api.post('/api/blogs').send(newBlog).expect(401)
  })

  test('can post', async () => {
    const newBlog = {
      title: 'A Blog From Jest',
      author: 'Jest',
      likes: 2,
      url: 'https://makingstuffs.co.uk',
    }

    const token = await getJwtToken()

    const savedBlog = await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)

    const blogs = (await helper.blogsInDb()).map((blog) => blog.title)
    const user = await User.findOne({ username: 'dbtest' })
    const userBlogs = user.blogs.map((blog) => JSON.stringify(blog))
    const blogId = JSON.stringify(savedBlog.body.id)
    const userId = JSON.stringify(user.id)
    const blogUserId = JSON.stringify(savedBlog.body.user)

    expect(userBlogs).toContain(blogId)
    expect(blogUserId).toEqual(userId)
    expect(blogs.length).toEqual(helper.initialBlogs.length + 1)
    expect(blogs).toContain('A Blog From Jest')
  })

  test('default likes', async () => {
    const token = await getJwtToken()

    const newBlog = {
      title: 'A Blog From Jest',
      author: 'Jest',
      url: 'https://makingstuffs.co.uk',
    }

    const result = (
      await api
        .post('/api/blogs')
        .set('authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    ).body

    expect(result.likes).toBe(0)
  })

  test('no title', async () => {
    const token = await getJwtToken()

    const newBlog = {
      author: 'Jest',
      likes: 2,
      url: 'https://makingstuffs.co.uk',
    }

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('no author', async () => {
    const token = await getJwtToken()
    const newBlog = {
      title: 'A Blog from Jest',
      likes: 2,
      url: 'https://makingstuffs.co.uk',
    }

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('no url', async () => {
    const token = await getJwtToken()
    const newBlog = {
      title: 'A Blog from Jest',
      author: 'Jest',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('delete tests', () => {
  test('no id to delete', async () => {
    await api.delete('/api/blogs/').expect(404)
    const blogs = await helper.blogsInDb()
    expect(blogs.length).toEqual(helper.initialBlogs.length)
  })

  test('delete one', async () => {
    const token = await getJwtToken()
    const savedBlog = (
      await api
        .post('/api/blogs/')
        .set('authorization', `bearer ${token}`)
        .send({ title: 'Title', author: 'me', url: 'website' })
        .expect(200)
    ).body

    const blogs = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${savedBlog.id}`)
      .set('authorization', `bearer ${token}`)
      .expect(200)

    const updatedUser = await User.findOne({ username: 'dbtest' })
    const updatedUserBlogs = updatedUser.blogs.map((blog) =>
      JSON.stringify(blog)
    )
    const updatedBlogs = await helper.blogsInDb()

    expect(updatedBlogs.length).toEqual(blogs.length - 1)
    expect(updatedUserBlogs).not.toContain(savedBlog._id)
  })

  test('no auth', async () => {
    const blogs = await helper.blogsInDb()
    const blogIds = blogs.map((blog) => JSON.stringify(blog._id))
    await api.delete(`/api/blogs/${blogIds[0]}`).expect(401)
  })
})

describe('put tests', () => {
  test('no id', async () => {
    await api.put(`/api/blogs/`).expect(404)
  })

  test('no body', async () => {
    const id = await helper.getBlogId()

    const response = await api
      .put(`/api/blogs/${id}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toMatch('Nothing to update')
  })

  test('invalid fields', async () => {
    const id = await helper.getBlogId()
    const obj = {
      wrong: 'field',
    }

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(obj)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toMatch('Nothing to update')
  })

  test('mixed validity', async () => {
    const id = await helper.getBlogId()
    const obj = {
      title: 'A New Title',
      wrong: 'Field',
    }

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(obj)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toMatch(obj.title)
    expect(response.body.wrong).not.toBeDefined()
  })

  test('multiple fields', async () => {
    const id = await helper.getBlogId()
    const obj = {
      title: 'A New Title',
      author: 'A New Author',
    }

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(obj)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toMatch(obj.title)
    expect(response.body.author).toMatch(obj.author)
  })

  test('update title', async () => {
    const id = await helper.getBlogId()
    const obj = {
      title: 'A New Title',
    }

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(obj)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toMatch(obj.title)
  })

  test('update author', async () => {
    const id = await helper.getBlogId()
    const obj = {
      author: 'New Author',
    }

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(obj)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.author).toMatch(obj.author)
  })

  test('update likes', async () => {
    const id = await helper.getBlogId()
    const obj = {
      likes: 0,
    }

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(obj)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(obj.likes)
  })

  test('update url', async () => {
    const id = await helper.getBlogId()
    const obj = {
      url: 'https://makingstuffs.co.uk',
    }

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(obj)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.url).toMatch(obj.url)
  })
})

afterEach(async () => await helper.dbClose())
