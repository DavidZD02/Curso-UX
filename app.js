const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("#posts-container");

function sendHTTPRequest(method, url, data) {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        return response.json();
    });
}

async function fetchPost() {
    const responseData = await sendHTTPRequest("GET", "https://jsonplaceholder.typicode.com/posts")
    const listOfPost = responseData

    for (const post of listOfPost) {
        const postContainer = document.createElement("article")
        postContainer.id = post.id
        postContainer.classList.add("post-item")

        const title = document.createElement("h2")
        title.textContent = post.title

        const body = document.createElement("p")
        body.textContent = post.body

        const button = document.createElement("button")
        button.textContent = "Delete Content"

        postContainer.append(title)
        postContainer.append(body)
        postContainer.append(button)

        listElement.append(postContainer);
    }
}

fetchButton.addEventListener("click", fetchPost)
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = event.currentTarget.querySelector("#title").value
    const content = event.currentTarget.querySelector("#content")

    console.log(title, content)
    createPost(title,content)
})

async function createPost(title, content) {
    const userId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: userId,
    };

    await sendHTTPRequest(
        "POST",
        "https://jsonplaceholder.typicode.com/posts",
        post
    );
}
