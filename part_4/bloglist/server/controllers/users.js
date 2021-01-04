const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { id: 1, title: 1, url: 1, author: 1 });
  return res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if ( !username || !password ) return res.status(400).json({ error: "Must enter a password and username"})
  if ( username.length < 3 || password.length < 3 ) return res.status(400).json({ error: "Password and username must be at least 3 characters"})
  
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    name,
    passwordHash,
  });
  const savedUser = await user.save();

  return res.json(savedUser.toJSON());
});

module.exports = usersRouter;
