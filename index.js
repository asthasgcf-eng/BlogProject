const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Initial Blogs
let blogs = [
  {
    title: "Learning HTML",
    author: "Astha",
    description: "Today I learned how to create a basic webpage using HTML."
  },
  {
    title: "Why I Like Web Development",
    author: "Astha",
    description: "I enjoy creating websites because they are interesting and creative."
  },
  {
    title: "My Internship Journey",
    author: "Astha",
    description: "I have started learning Full Stack Development and this is my Day 8 task."
  }
];

// Home Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Get All Blogs
app.get("/blogs", (req, res) => {
  res.status(200).json(blogs);
});

// Add Blog
app.post("/add-blog", (req, res) => {
  const { title, author, description } = req.body;

  if (!title || !author || !description) {
    return res.status(400).json({
      message: "Please fill all the fields."
    });
  }

  const newBlog = {
    title: title.trim(),
    author: author.trim(),
    description: description.trim()
  };

  blogs.push(newBlog);

  res.status(201).json({
    message: "Blog added successfully!",
    blog: newBlog
  });
});

// Edit Blog
app.put("/edit-blog/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (isNaN(index) || index < 0 || index >= blogs.length) {
    return res.status(404).json({
      message: "Blog not found!"
    });
  }

  const { title, author, description } = req.body;

  if (!title || !author || !description) {
    return res.status(400).json({
      message: "Please fill all the fields."
    });
  }

  blogs[index] = {
    title: title.trim(),
    author: author.trim(),
    description: description.trim()
  };

  res.status(200).json({
    message: "Blog updated successfully!",
    blog: blogs[index]
  });
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});