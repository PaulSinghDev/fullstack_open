const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, minlength: 3, required: true },
  name: String,
  passwordHash: { type: String, required: true },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  }],
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
