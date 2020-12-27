const config = require("../utils/config");
const mongoose = require("mongoose");

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to Mongo DB"))
  .catch((error) => console.error(error));

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
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
