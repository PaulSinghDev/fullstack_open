const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  url: String,
  likes: {
    type: Number,
    default: 0
  },
});

/**
 * Use Mongoose's api to alter the object which
 * is returned by the toJson method
 */
blogSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
