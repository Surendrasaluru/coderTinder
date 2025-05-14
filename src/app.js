const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "mani",
    lastName: "saluru",
    email: "mani@gmail.com",
    password: "mani123",
  };

  const user = new User(userObj); //creating instance with user model
  await user.save();
  res.send("user added succesfully");
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
