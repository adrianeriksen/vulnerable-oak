const express = require("express");
const hbs = require("hbs");

const app = express();
const port = 3000;

hbs.localsAsTemplateData(app);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.urlencoded({ extended: true }));

let nextId = 4;

const database = [
  {
    id: 1,
    author: "Adrian",
    content: "All I want to do is security something something 🤠"
  },
  {
    id: 2,
    author: "Skjalg",
    content: "TypeScript all the things! 😍"
  },
  {
    id: 3,
    author: "Adrian",
    content: "Printskjema is my altered beast 🐒"
  }
];

app.get("/", res => res.redirect(302, "/posts"));

app.get("/posts", (req, res) => {
  res.locals = {
    posts: database
  };

  res.render("posts");
});

app.post("/posts", (req, res) => {
  const { author, content } = req.body;
  database.push({
    id: nextId,
    author,
    content
  });
  nextId++;
  res.redirect(302, "/posts");
});

app.listen(port, () => console.log(`vulnerable-oak running at port ${port}`));
