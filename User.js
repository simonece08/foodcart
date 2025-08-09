// Sample array of users
let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

// Function to add a new user
function addUser(email, username, password) {
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
  updateTable();
  // Close the modal
  let modal = document.getElementById('addUserModal');
  let bootstrapModal = bootstrap.Modal.getInstance(modal);
  
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
  updateTable();
}

// Initial table update
updateTable();