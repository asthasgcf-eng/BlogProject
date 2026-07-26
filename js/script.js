const form = document.getElementById("blogForm");

form.addEventListener("submit", function(event){

    event.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let description = document.getElementById("description").value;

    if(title==="" || author==="" || description==="")
    {
        alert("Please fill all the fields.");
    }
    else
    {
        alert("Blog submitted successfully!");
    }

});