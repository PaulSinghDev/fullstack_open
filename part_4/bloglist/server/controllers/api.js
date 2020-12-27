const ApiRouter = require("express").Router();
const Blog = require("../models/Blog");
const logger = require("../utils/logger");
require("express-async-errors");

ApiRouter.get("/blogs", async (req, res) => {
  logger.info("Getting all entries");
  const blogs = await Blog.find({});
  return blogs
    ? res.status(200).json(blogs)
    : res.status(404).json({ error: "No blogs found" });
});

ApiRouter.post("/blogs", async (req, res) => {
  logger.info("Creating new entry");
  const blog = new Blog(req.body);
  const newBlog = await blog.save();

  return newBlog
    ? res.status(200).json(newBlog)
    : res.status(400).json({ error: "Incorrect data" });
});

module.exports = ApiRouter;
