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
    localStorage.setItem("adminLogged", "true"); // Store as string "true"
    alert("Admin login successful!");
    window.location.href = "admin-dashboard.html"; // Redirect to admin dashboard
  } else {
    alert("Invalid admin credentials!");
  }
}

// Attach adminLogin to the form's submit event
// document.addEventListener("DOMContentLoaded",adminLogin );


function logoutAdmin() {
    // Set adminLogged to "false"
    localStorage.setItem("adminLogged", "false");
  
    // Notify the admin of successful logout
    alert("You have logged out successfully!");
  
    // Redirect to admin login page
    window.location.href = "admin-login.html";
  }
  