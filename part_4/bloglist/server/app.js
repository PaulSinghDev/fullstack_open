const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const ApiRouter = require("./controllers/api");
const app = express();
const config = require("./utils/config");

app.use(helmet());
app.use(cors());
app.use(express.json());


app.use("/api", ApiRouter);

module.exports = app;
