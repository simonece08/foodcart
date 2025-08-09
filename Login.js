
let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

function checkLogin() {
  var username = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (username === "Admin" && password === "Admin123") {
    window.location.href = "User.html";
    return;
  }

  let user = users.find(user => user.email === username && user.password === password);
  if (user) {
    alert("Login successful!");

    // Store username in localStorage
    localStorage.setItem('loggedInUser', user.username);

    window.location.href = "Menu1.html";
  } else {
    alert("Invalid email or password. Please try again.");
  }
}