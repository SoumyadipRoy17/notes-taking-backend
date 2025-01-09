const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});
app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    }
  );
});
app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.render("show", { data: data, filename: req.params.filename });
  });
});

app.post("/edit", (req, res) => {
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}`,
    (err) => {
      if (err) {
        console.log(err);
      }
      fs.writeFile(`./files/${req.body.new}`, req.body.newDetails, (err) => {
        if (err) {
          console.log(err);
        }
        res.redirect("/");
      });
    }
  );
});

app.get("/edit/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.render("edit", { data: data, filename: req.params.filename });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
