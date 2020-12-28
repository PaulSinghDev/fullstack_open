const blogsRouter = require("express").Router();
const logger = require("../utils/logger");
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  logger.info("Getting all entries");
  const blogs = await Blog.find({});
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

  if (typeof req.body.title === "undefined") {
    return res.status(400).json({ error: "No title" });
  }

  if (typeof req.body.author === "undefined") {
    return res.status(400).json({ error: "No author" });
  }

  if (typeof req.body.url === "undefined") {
    return res.status(400).json({ error: "No url" });
  }

  const blog = new Blog(req.body);
  const newBlog = await blog.save();

  return newBlog
    ? res.status(200).json(newBlog)
    : res.status(400).json({ error: "Incorrect data" });
});

blogsRouter.delete("/:id", async (req, res) => {
  logger.info("Deleting one entry");
  const response = await Blog.deleteOne({ _id: req.params.id });
  res.status(200).json(response);
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
