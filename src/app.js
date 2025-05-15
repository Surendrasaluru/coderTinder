const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body); //creating instance with user model
  try {
    await user.save();
    res.send("user added succesfully");
  } catch (err) {
    res.status(400).send("error occured while saving user");
  }

  console.log(req.body);
});

//FEED API

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.findOne({ email: userEmail }); //findonereturns only one user

    if (user.length === 0) {
      res.status(400).send("user not found with given mail");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("error in getting user");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find(); //find with emptyfilter returns all
    res.send(users);
  } catch (err) {
    res.status(400).send("error in getting feed");
  }
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
