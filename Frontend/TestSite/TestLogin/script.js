console.log("script.js loaded");


const form = document.getElementById("login-form");

form.addEventListener("submit", async(e) => {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    data = {
        "username": username,
        "password": password
    };

    const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(data),
    })
    const result = await response.json();
    console.log(result);

})
