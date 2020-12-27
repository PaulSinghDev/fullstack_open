const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const initialBlogs = require("./blogs");
const Blog = require("../models/Blog");

/**
 * Create an api variable to test the app's
 * api routes.
 */
const api = supertest(app);

/**
 * Initialise the database;
 */
beforeEach(async () => {
    await Blog.deleteMany({});
    for ( let blog of initialBlogs ) {
        const newBlog = new Blog(blog);
        await newBlog.save();
    }
});


test("response is json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("has id field", async () => {
  const blogs = await api.get("/api/blogs");
  console.log(blogs.body);
  expect(blogs.body[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
