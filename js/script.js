// Simulated Local Storage Data
let users = JSON.parse(localStorage.getItem("users")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let adminCredentials = { username: "admin", password: "admin123" };
// =================== User Authentication =================== //

// Login Function
function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login successful!");
    window.location.href = "order.html";
  } else {
    alert("Invalid credentials!");
  }
}

// Register Function
function register(event) {
  event.preventDefault();
  // Get input values
  const fullName = document.getElementById("fullName").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const newUser = {
    fullName,
    username,
    password,
    phone,
    address,
  };
  // Retrieve existing users from local storage
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check for duplicate username
  const usernameExists = existingUsers.some(
    (user) => user.username === newUser.username
  );
  if (usernameExists) {
    alert("Username already exists. Please choose a different one.");
    return; // Exit the function if username exists
  }

  // Add the new user to the existing users array
  existingUsers.push(newUser);

  // Save the updated users array back to local storage
  localStorage.setItem("users", JSON.stringify(existingUsers));

  // Clear the form
  document.getElementById("registerForm").reset();

  // Optionally, redirect to login or home page
  alert("Registration successful! You can now log in.");
  window.location.href = "login.html"; // Redirect to the login page
}

// Admin Login Function
function adminLogin(event) {
  event.preventDefault();
  const adminUsername = document.getElementById("adminUsername").value;
  const adminPassword = document.getElementById("adminPassword").value;

  if (
    adminUsername === adminCredentials.username &&
    adminPassword === adminCredentials.password
  ) {
    alert("Admin login successful!");
    window.location.href = "admin-dashboard.html";
  } else {
    alert("Invalid admin credentials!");
  }
}

// Logout Function for Users
function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// =================== Order Management =================== //

// Populate Customer Name from Login Info
document.addEventListener("DOMContentLoaded", () => {
  const orderSection = document.getElementById("orderForm");
  if (!currentUser) {
    orderSection.innerHTML = "<p>Please log in to view your orders.</p>";
    return;
  }
  if (currentUser && document.getElementById("customerName")) {
    document.getElementById("customerName").value = currentUser.username;
  }
  calculateTotal(); // Initialize total calculation
});

// Function to Add Another Food Item
function addFoodItem() {
  const foodList = document.getElementById("foodList");
  const newFoodItem = document.createElement("div");
  newFoodItem.classList.add("food-item");

  // Create new food item input structure
  newFoodItem.innerHTML = `
          <label for="food">Select Food:</label>
          <select class="foodSelect" onchange="calculateTotal()">
              <option value="Pizza" data-price="10">Pizza - $10</option>
              <option value="Burger" data-price="8">Burger - $8</option>
              <option value="Pasta" data-price="12">Pasta - $12</option>
          </select>
          <label for="quantity">Quantity:</label>
          <input type="number" class="quantity" min="1" value="1" onchange="calculateTotal()" required>
          <button type="button" onclick="removeFoodItem(this)">Remove</button>
      `;

  foodList.appendChild(newFoodItem); // Append new food item to list
  calculateTotal(); // Recalculate total after adding new item
}

// Function to Remove Food Item
function removeFoodItem(button) {
  const foodItem = button.parentElement; // Get the parent element of the button (the food item div)
  foodItem.remove(); // Remove the food item
  calculateTotal(); // Recalculate total after removing
}

// Function to Calculate Total Price
function calculateTotal() {
  const foodSelects = document.querySelectorAll(".foodSelect");
  const quantities = document.querySelectorAll(".quantity");
  let totalPrice = 0;

  // Loop through each food item and calculate total based on selected food and quantity
  foodSelects.forEach((foodSelect, index) => {
    const foodPrice = parseInt(
      foodSelect.selectedOptions[0].getAttribute("data-price")
    ); // Get food price from selected option
    const quantity = parseInt(quantities[index].value); // Get the corresponding quantity
    totalPrice += foodPrice * quantity; // Add price * quantity to total
  });

  // Update total price display
  document.getElementById("totalPrice").innerText = totalPrice;
}

// Function to Place Order
function placeOrder(event) {
  event.preventDefault();

  // Gather order details
  const customerName = currentUser.username;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const foodSelects = document.querySelectorAll(".foodSelect");
  const quantities = document.querySelectorAll(".quantity");

  const orderedItems = Array.from(foodSelects).map((foodSelect, index) => ({
    food: foodSelect.value, // Get selected food name
    quantity: quantities[index].value, // Get quantity for that food
  }));

  const total = document.getElementById("totalPrice").innerText;

  // Create new order object
  const newOrder = {
    customerName,
    phoneNumber,
    orderedItems,
    total,
    status: "In Progress",
  };

  // Add new order to orders array and save to local storage
  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  // Notify user and redirect
  alert("Order placed successfully!");
  window.location.href = "previous-orders.html";
}

// Load Previous Orders
function displayPreviousOrders() {
  const ordersContainer = document.getElementById("ordersContainer");

  if (!currentUser) {
    ordersContainer.innerHTML =
      "<p>Please log in to view your previous orders.</p>";
    return;
  }

  const userOrders = orders.filter(
    (order) => order.customerName === currentUser.username
  );

  if (userOrders.length === 0) {
    ordersContainer.innerHTML = "<p>No previous orders found.</p>";
    return;
  }

  userOrders.forEach((order, index) => {
    const orderElement = document.createElement("div");
    orderElement.classList.add("order");
    const items = Array.isArray(order.orderedItems) ? order.orderedItems : [];

    orderElement.innerHTML = `
            <h3>Order #${index + 1}</h3>
            <p><strong>Customer Name:</strong> ${order.customerName}</p>
            <p><strong>Phone Number:</strong> ${order.phoneNumber}</p>
            <h4>Ordered Items:</h4>
            <ul>${items
              .map(
                (item) => `<li>${item.food} - Quantity: ${item.quantity}</li>`
              )
              .join("")}</ul>
            <p><strong>Total Price:</strong> $${order.total}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <hr>
        `;

    ordersContainer.appendChild(orderElement);
  });
}

// =================== Profile Management =================== //

// Populate Customer Name from Login Info
document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const phoneInput = document.getElementById("phone");
  const profileForm = document.getElementById("profileForm");
if (!currentUser) {
  profileForm.innerHTML = "<p>Please log in to view your profile.</p>";
    return;
  }
  if (currentUser) {
    usernameInput.value = currentUser.username;
    phoneInput.value = currentUser.phone || "";
  }
});

// Update Profile Functionality
function updateProfile(event) {
  event.preventDefault();
  const updatedPhone = document.getElementById("phone").value;
  currentUser.phone = updatedPhone;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  alert("Profile updated successfully!");
}
// Logout function
function logoutUser() {
  localStorage.removeItem("currentUser"); // Clear current user from localStorage
  alert("You have logged out successfully!");
  window.location.href = "index.html"; // Redirect to login page
}

// =================== Admin Functionality =================== //

// Admin Logout
function logoutAdmin() {
  alert("Admin logged out");
  window.location.href = "../index.html";
}

// =================== Event Listeners =================== //

// Event Listener for Document Loaded
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const profileForm = document.getElementById("profileForm");

  if (loginForm) {
    loginForm.addEventListener("submit", login);
  }

  if (profileForm) {
    profileForm.addEventListener("submit", updateProfile);
  }

  if (window.location.pathname.includes("previous-orders.html")) {
    displayPreviousOrders();
  }
});

// Recalculate total whenever food or quantity changes
document.addEventListener("change", function (event) {
  if (
    event.target.classList.contains("foodSelect") ||
    event.target.classList.contains("quantity")
  ) {
    calculateTotal();
  }
});

// Sample User Data for Testing
if (!localStorage.getItem("users")) {
  const sampleUsers = [
    {
      fullName: "John Doe",
      username: "johndoe",
      password: "password123",
      phone: "+1234567890",
      address: "123 Main St, Cityville",
    },
    {
      fullName: "Jane Smith",
      username: "janesmith",
      password: "smith789",
      phone: "+9876543210",
      address: "456 Oak St, Townsville",
    },
    {
      fullName: "Michael Brown",
      username: "mikebrown",
      password: "mikepass456",
      phone: "+1122334455",
      address: "789 Pine St, Villagetown",
    },
    {
      fullName: "Emily Davis",
      username: "emilydavis",
      password: "davispass321",
      phone: "+2233445566",
      address: "101 Maple Ave, Suburbia",
    },
    {
      fullName: "Daniel Lee",
      username: "danlee",
      password: "leesecret234",
      phone: "+3344556677",
      address: "202 Cedar Rd, Metrocity",
    },
  ];

  localStorage.setItem("users", JSON.stringify(sampleUsers));
}

// Simulated Local Storage Data
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Function to render employee list
function renderEmployeeList() {
  const employeeList = document.getElementById("employeeList");
  employeeList.innerHTML = ""; // Clear the current list

  employees.forEach((employee, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("employee-item");
    listItem.innerHTML = `

<div>

<span>Employee Name: ${employee.name}</span><br>
<span>ID: ${employee.employeeId}</span>
</div>
            
            <button onclick="deleteEmployee(${index})">Delete</button>
        `;
    employeeList.appendChild(listItem);
  });
}

// Function to add a new employee
function addEmployee(event) {
  event.preventDefault(); // Prevent the form from reloading the page

  const employeeName = document.getElementById("employeeName").value;
  const employeeId = document.getElementById("employeeId").value;

  // Add employee to the employees array
  employees.push({ name: employeeName, employeeId: employeeId });
  localStorage.setItem("employees", JSON.stringify(employees));

  // Clear the form
  document.getElementById("addEmployeeForm").reset();

  // Render the updated employee list
  renderEmployeeList();
}

// Function to delete an employee
function deleteEmployee(index) {
  employees.splice(index, 1); // Remove the employee from the array
  localStorage.setItem("employees", JSON.stringify(employees)); // Update local storage

  // Re-render the list after deletion
  renderEmployeeList();
}

// Event listener for form submission
document
  .getElementById("addEmployeeForm")
  .addEventListener("submit", addEmployee);

// Render the employee list on page load
document.addEventListener("DOMContentLoaded", renderEmployeeList);
