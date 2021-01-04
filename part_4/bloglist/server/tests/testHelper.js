const initialBlogs = require("./blogs");
const mongoose = require("mongoose");
const config = require("../utils/config");
const Blog = require("../models/blog");
const User = require("../models/user");

const blogsInDb = async () =>
  (await Blog.find({})).map((blog) => blog.toJSON());

const dbConnect = async () => {
  await mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};
const dbClose = async () => {
  await mongoose.connection.close();
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

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

const getBlogId = async () => {
  const blogs = await blogsInDb();
  return blogs[0].id;
}

const getUserId = async () => {
  const users = await usersInDb();
  return users[0].id;
}

module.exports = {
  initialBlogs,
  usersInDb,
  blogsInDb,
  nonExistingId,
  dbConnect,
  dbClose,
  getBlogId,
  getUserId
};
