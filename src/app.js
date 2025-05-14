const express = require("express");
const connectDB = require("./config/database");
const app = express();

app.use((req, res) => {
  res.send("hi from the backend with nodemon");
});

connectDB()
  .then(() => {
    console.log("database succesfully connected");
    app.listen(3000, () => {
      console.log("server sucesfully connected");
    });
  })
  .catch((err) => {
    console.log("failed due to" + err.message);
  });
