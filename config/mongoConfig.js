const mongoose = require("mongoose");

const connectDb = async function (uri) {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`DB connection issue : ${error}`);
  }
};

module.exports = connectDb;
