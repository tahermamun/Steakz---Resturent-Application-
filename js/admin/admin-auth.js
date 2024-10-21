// Admin Login Function
let adminCredentials = { username: "admin", password: "admin" };

function adminLogin(event) {
  event.preventDefault();
  const adminUsername = document.getElementById("adminUsername").value;
  const adminPassword = document.getElementById("adminPassword").value;

  if (
    adminUsername === adminCredentials.username &&
    adminPassword === adminCredentials.password
  ) {
    localStorage.setItem("adminLogged", "true");
    alert("Admin login successful!");
    window.location.href = "admin-dashboard.html";
  } else {
    alert("Invalid admin credentials!");
  }
}

function logoutAdmin() {
  localStorage.setItem("adminLogged", "false");
  alert("You have logged out successfully!");
  window.location.href = "admin-login.html";
}
