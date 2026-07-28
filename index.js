const express = require("express");
const app = express();
app.use(express.json());
let blogs = [];
app.get("/", (req, res) => {
  res.send("Welcome to My Blog API");
});

app.get("/blogs", (req, res) => {
  res.json(blogs);
});

app.post("/add-blog", (req, res) => {
  const { title, author, description } = req.body;
  const newBlog = {
    title,
    author,
    description,
  };
  blogs.push(newBlog);

  res.json({
    message: "Blog added successfully!",
    blog: newBlog,
  });
});
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
