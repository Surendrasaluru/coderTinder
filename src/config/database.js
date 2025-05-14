const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://surendrasaluru:hfbjOs4uIJt8fYLQ@cluster0.dneu1iz.mongodb.net/"
  );
};

module.exports = connectDB;
