const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const ApiRouter = require("./controllers/api");
const app = express();
const config = require("./utils/config");
const mongoose = require("mongoose");

app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to Mongo DB"))
  .catch((error) => console.error(error));

app.use("/api", ApiRouter);

module.exports = app;
