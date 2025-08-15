require("dotenv").config();
const express = require("express");
const dns = require("node:dns");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const connectDb = require("./config/mongoConfig");
const urlRouter = require("./routes/urlRoutes");
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.use("/api/shorturl", urlRouter);

app.listen(port, function () {
  connectDb(process.env.MONGO_URI);

  console.log(`Listening on port ${port}`);
});
