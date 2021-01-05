const blogsRouter = require("express").Router();
const logger = require("../utils/logger");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (req, res) => {
  logger.info("Getting all entries");
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 });
  return blogs
    ? res.status(200).json(blogs)
    : res.status(404).json({ error: "No blogs found" });
});

blogsRouter.get("/:id", async (req, res) => {
  logger.info("Getting one entry");
  const blog = await Blog.findOne({ _id: req.params.id });
  return blog
    ? res.status(200).json(blog)
    : res.status(404).json({ error: "No blogs found" });
});

blogsRouter.post("/", async (req, res) => {
  logger.info("Creating new entry");

  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "Token missing or invalid" });
  }
  
  if (typeof req.body.title === "undefined") {
    return res.status(400).json({ error: "No title" });
  }

  if (typeof req.body.author === "undefined") {
    return res.status(400).json({ error: "No author" });
  }

  if (typeof req.body.url === "undefined") {
    return res.status(400).json({ error: "No url" });
  }

  const user = await User.findById(decodedToken.id);
  const blogObject = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    user: user.id,
  };

  const blog = new Blog(blogObject);
  const newBlog = await blog.save();

  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();

  return newBlog
    ? res.status(200).json(newBlog.toJSON())
    : res.status(400).json({ error: "Incorrect data" });
});

blogsRouter.delete("/:id", async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "Token missing or invalid" });
  }

  const blog = await Blog.findById(req.params.id);
  if ( !blog ) {
    return res.status(404).json({ error: "No blog post found with the provided ID"})
  }
 

  if ( blog.user.toString() !== decodedToken.id.toString() ) {
    return res.status(401).json({error: "Permission denied. You do not have the permission to delete this post."})
  }

  const response = await Blog.deleteOne({ _id: req.params.id });

  const user = await User.findById(blog.user._id);

  user.blogs = user.blogs.filter(blog => blog._id !== req.params.id)

  await user.save();

  return response.deletedCount === 1
    ? res.status(200).json({ message: "Deleted 1 blog" })
    : res.status(400).json({ error: "There was a problem with the request" });
});

blogsRouter.put("/:id", async (req, res) => {
  logger.info("Updating one entry");
  if (typeof req.params.id === "undefined") {
    return res.status(400).json({ error: "You must provide an ID" });
  }

  const body = req.body;
  const keys = Object.keys(body);

  for (let key of keys) {
    switch (key) {
      case "author":
        break;
      case "title":
        break;
      case "likes":
        break;
      case "url":
        break;
      default:
        const index = keys.indexOf(key);
        keys.splice(index, 1);
        delete body[key];
        break;
    }
  }

  if (keys.length === 0)
    return res.status(400).json({ error: "Nothing to update" });

  const response = await Blog.findByIdAndUpdate(req.params.id, body, {
    new: true,
  });

  return res.status(200).json(response);
});

module.exports = blogsRouter;
