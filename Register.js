let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

function addUser(email, username, password) {
  // Check if the email is a valid email address
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Check if the email already exists
  let existingEmail = users.find(user => user.email === email);
  if (existingEmail) {
    alert('Email already exists. Please choose a different one.');
    return;
  }

  // Check if the username already exists
  let existingUsername = users.find(user => user.username === username);
  if (existingUsername) {
    alert('Username already exists. Please choose a different one.');
    return;
  }

  // Add the new user if no duplicate email or username is found
  users.push({ email: email, username: username, password: password });
  localStorage.setItem('users', JSON.stringify(users));
}

// Function to update the table with users
function updateTable() {
  let tbodyUsers = document.getElementById('tbodyUsers');
  tbodyUsers.innerHTML = '';
  users.forEach((user, index) => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${user.email}</td>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>
            <button class="btn btn-primary btn-sm" onclick="editUser(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
        </td>
    `;
    tbodyUsers.appendChild(tr);
  });
}

// Function to handle form submission
document.getElementById('btnAdd').addEventListener('click', function () {
  let email = document.getElementById('floatingEmail').value;
  let username = document.getElementById('floatingUsername').value;
  let password = document.getElementById('floatingPassword').value;
  addUser(email, username, password);
  updateTable(); // Assuming this function is defined in your HTML file
});

// Function to edit a user
function editUser(index) {
  // You can implement editing functionality here
  console.log(`Editing user at index ${index}`);
}

// Function to delete a user
function deleteUser(index) {
  users.splice(index, 1);
  localStorage.setItem('users', JSON.stringify(users));
  updateTable(); // Assuming this function is defined in your HTML file
}

// Initial table update
updateTable(); // Assuming this function is defined in your HTML file