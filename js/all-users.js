// Fetch users from local storage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Function to render the list of users
function renderUserList() {
    const userTableBody = document.querySelector(".customer-table tbody");
    userTableBody.innerHTML = ""; // Clear existing rows

    // Loop through users and create rows for each
    users.forEach((user, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.fullName}</td>
            <td>${user.username}</td>
            <td>${user.phone}</td>
            <td>${user.address}</td>
            <td><button class="action-btn delete" onclick="deleteUser(${index})">Delete</button></td>
        `;

        userTableBody.appendChild(row);
    });
}

// Function to delete a user from local storage
function deleteUser(index) {
    // Remove user from the array
    users.splice(index, 1);

    // Update local storage
    localStorage.setItem("users", JSON.stringify(users));

    // Re-render the user list
    renderUserList();
}

// Call renderUserList on page load
document.addEventListener("DOMContentLoaded", () => {
    renderUserList();
});

