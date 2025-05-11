const express = require("express");
const app = express();
app.use((req, res) => {
  res.send("hi from the backend with nodemon");
});
app.listen(3000, () => {
  console.log("server sucesful");
});
