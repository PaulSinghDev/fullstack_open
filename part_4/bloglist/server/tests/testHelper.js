const app = require("../app");
const supertest = require("supertest");
const initialBlogs = require("./blogs");
const Blog = require("../models/Blog");

const api = supertest(app);

const blogsInDb = async () =>
  (await Blog.find({})).map((blog) => blog.toJSON());

const nonExistingId = async () => {
  const newBlog = {
    title: "To Delete",
    author: "Non Existing",
    url: "https://byebye.com",
    likes: 0,
  };

  const blog = new Blog(newBlog);
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
};
