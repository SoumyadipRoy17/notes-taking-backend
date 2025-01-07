const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile/:username", (req, res) => {
  const username = req.params.username;
  console.log(username);
  res.send(`welcome to ${username} profile`);
});
app.get("/author/:username/:age", (req, res) => {
  const username = req.params.username;
  const age = req.params.age;
  res.send(`welcome to ${username} profile`);
  console.log(username, age);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
