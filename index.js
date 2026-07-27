const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to My Blog API");
});

app.post("/add-blog", (req, res) => {
  const blog = req.body;

  res.json({
    message: "Blog added successfully!",
    blog: blog,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
