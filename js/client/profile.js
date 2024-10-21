let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Populate Customer Name from Login Info
document.addEventListener("DOMContentLoaded", () => {
  const fullNameInput = document.getElementById("fullName");
  const usernameInput = document.getElementById("username");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password");
  const addressInput = document.getElementById("address");
  const profileForm = document.getElementById("profileForm");

  // Check if currentUser is null
  if (!currentUser) {
    profileForm.innerHTML = "<p>Please log in to view your profile.</p>";
    return;
  }

  // Populate input fields with current user's data
  fullNameInput.value = currentUser.fullName;
  usernameInput.value = currentUser.username;
  phoneInput.value = currentUser.phone || "";
  passwordInput.value = currentUser.password;
  addressInput.value = currentUser.address;

  // Attach the updateProfile function to form submission
  profileForm.addEventListener("submit", updateProfile);
});

// Update Profile Functionality
function updateProfile(event) {
  event.preventDefault();

  const fullNameInput = document.getElementById("fullName").value;
  const usernameInput = document.getElementById("username").value;
  const phoneInput = document.getElementById("phone").value;
  const passwordInput = document.getElementById("password").value;
  const addressInput = document.getElementById("address").value;

  // Update the currentUser object
  currentUser.fullName = fullNameInput;
  currentUser.phone = phoneInput;
  currentUser.password = passwordInput;
  currentUser.address = addressInput;

  // Update localStorage for currentUser
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  const userIndex = users.findIndex(
    (user) => user.username === currentUser.username
  );
  if (userIndex !== -1) {
    users[userIndex] = currentUser;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Profile updated successfully!");
  }
}
// Logout function
function logoutUser() {
  localStorage.removeItem("currentUser");
  alert("You have logged out successfully!");
  window.location.href = "index.html";
}
