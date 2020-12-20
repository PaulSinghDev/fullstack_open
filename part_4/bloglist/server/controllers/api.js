const ApiRouter = require('express').Router();
const Blog = require('../models/Blog');
const logger = require('../utils/logger');

ApiRouter.get('/blogs', (req, res) => {
    logger.info('Getting all entries');
    Blog.find({})
    .then(blogs => res.json(blogs))
    .catch(error => console.error(error));
});

ApiRouter.post('/blogs', (req, res) => {
    logger.info('Creating new entry');
    const blog = new Blog(req.body);
    blog.save()
        .then(blogs => res.json(blogs))
        .catch(error => console.log(error));
});

module.exports = ApiRouter;