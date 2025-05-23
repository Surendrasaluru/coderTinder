const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");

app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const user = new User(req.body); //creating instance with user model
    await user.save();
    res.send("user added succesfully");
  } catch (err) {
    res.status(400).send("error occured while saving user" + err.message);
    //console.log(err.message);
  }

  //console.log(req.body);
});

//user API
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

//get feed api
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find(); //find with emptyfilter returns all
    res.send(users);
  } catch (err) {
    res.status(400).send("error in getting feed");
  }
});

//delete user api
app.delete("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("user deleted succesfully!");
  } catch (err) {
    res.status(400).send("error in deleting user");
  }
});

app.patch("/user/:_id", async (req, res) => {
  const userId = req.params?._id; //coming from url (_id ni userid ani pilicham)
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "gender", "photoURL", "about", "skills"];

    const isAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    //console.log(isAllowed);

    if (!isAllowed) {
      throw new Error("Update not allowed");
    }

    if (data.skills.length > 8) {
      throw new Error("Skills must be less than 8");
    }
    await User.findByIdAndUpdate(
      { _id: userId },

      data,
      { runValidators: true }
    );
    res.send("user updated succesfully!");
  } catch (err) {
    res.status(400).send("error in updatingg user due to " + err.message);
    //console.log(err.message);
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
