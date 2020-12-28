const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { username: 1, name: 1 });
  return res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
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
