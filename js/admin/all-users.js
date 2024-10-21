let users = JSON.parse(localStorage.getItem("users")) || [];

function renderUserList() {
  const userTableBody = document.querySelector(".customer-table tbody");
  userTableBody.innerHTML = "";

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

function deleteUser(index) {
  users.splice(index, 1);

  localStorage.setItem("users", JSON.stringify(users));

  renderUserList();
}

document.addEventListener("DOMContentLoaded", () => {
  let adminLogged = JSON.parse(localStorage.getItem("adminLogged"));
  if (!adminLogged || null) {
    alert("Please Login to Admin Panel");
    window.location.href = "admin-login.html";
  }

  renderUserList();
});
