const form = document.getElementById("blogForm");

// ------------------------
// Add Blog
// ------------------------

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const description = document.getElementById("description").value;

        if (!title || !author || !description) {
            alert("Please fill all the fields.");
            return;
        }

        fetch("http://localhost:3000/add-blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                author,
                description
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            window.location.href = "index.html";
        })
        .catch(error => {
            console.log(error);
            alert("Something went wrong.");
        });
    });
}

// ------------------------
// Display Blogs
// ------------------------

const blogContainer = document.getElementById("blogContainer");

if (blogContainer) {
    loadBlogs();
}

function loadBlogs() {

    fetch("http://localhost:3000/blogs")
        .then(response => response.json())
        .then(blogs => {

            blogContainer.innerHTML = "";

            blogs.forEach((blog, index) => {

                blogContainer.innerHTML += `
                    <div class="blog-card">

                        <h3>${blog.title}</h3>

                        <p><strong>Author:</strong> ${blog.author}</p>

                        <p>${blog.description}</p>

                        <button onclick="editBlog(${index})">
                            ✏ Edit
                        </button>

                    </div>
                `;
            });

        })
        .catch(error => {
            console.log(error);
        });
}

// ------------------------
// Edit Blog
// ------------------------

function editBlog(index) {

    const title = prompt("Enter new title");
    if (title === null) return;

    const author = prompt("Enter new author");
    if (author === null) return;

    const description = prompt("Enter new description");
    if (description === null) return;

    if (!title || !author || !description) {
        alert("All fields are required.");
        return;
    }

    fetch(`http://localhost:3000/edit-blog/${index}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            author,
            description
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadBlogs();
    })
    .catch(error => {
        console.log(error);
        alert("Something went wrong.");
    });
}