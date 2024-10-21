// Simulated Local Storage Data
let users = JSON.parse(localStorage.getItem("users")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let employees = JSON.parse(localStorage.getItem("employees")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let adminCredentials = { username: "admin", password: "admin123" };

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
      alert("Invalid credentials!"); // Provide feedback for invalid login
    }
  }

// Register Function
function register(event) {
  event.preventDefault();
  const newUsername = document.getElementById("newUsername").value;
  const newPassword = document.getElementById("newPassword").value;

  users.push({ username: newUsername, password: newPassword });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful!");
  window.location.href = "login.html";
}

// Place Order Function
function placeOrder(event) {
  event.preventDefault();
  const customerName = currentUser.username;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const food = document.getElementById("foodSelect").value;
  const quantity = document.getElementById("quantity").value;
  const price = calculatePrice(food, quantity);

  orders.push({
    customerName,
    phoneNumber,
    food,
    quantity,
    price,
    status: "In Progress",
  });
  localStorage.setItem("orders", JSON.stringify(orders));
  alert("Order placed successfully!");
  window.location.href = "previous-orders.html";
}

function calculateTotal() {
    const foodSelects = document.querySelectorAll(".foodSelect");
    const quantities = document.querySelectorAll(".quantity");
    let totalPrice = 0;
  
    if (foodSelects.length === 0 || quantities.length === 0) return; // Prevent errors if no items
  
    // Loop through each food item and calculate total based on selected food and quantity
    foodSelects.forEach((foodSelect, index) => {
      const foodPrice = parseInt(foodSelect.selectedOptions[0].getAttribute("data-price")) || 0; // Default to 0
      const quantity = parseInt(quantities[index].value) || 0; // Default to 0
      totalPrice += foodPrice * quantity; // Add price * quantity to total
    });
  
    // Update total price display
    const totalPriceElement = document.getElementById("totalPrice");
    if (totalPriceElement) {
      totalPriceElement.innerText = totalPrice; // Ensure element exists
    }
  }
  

// Load Previous Orders
function loadPreviousOrders() {
  const ordersList = document.getElementById("ordersList");
  ordersList.innerHTML = "";
  const userOrders = orders.filter(
    (order) => order.customerName === currentUser.username
  );
  userOrders.forEach((order) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${order.food} x ${order.quantity} - $${order.price} [${order.status}]`;
    ordersList.appendChild(listItem);
  });
}

// Admin Login
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

// Admin Logout
function logoutAdmin() {
  alert("Admin logged out");
  window.location.href = "../index.html";
}





// Sample User Data for Testing
if (!localStorage.getItem("users")) {
    const sampleUsers = [
      { username: "taher", password: "taher" },
      { username: "mamun", password: "mamun" },
    ];
    localStorage.setItem("users", JSON.stringify(sampleUsers));
  }
  
// Recalculate total whenever food or quantity changes
document.addEventListener("change", function (event) {
  if (
    event.target.classList.contains("foodSelect") ||
    event.target.classList.contains("quantity")
  ) {
    calculateTotal();
  }
});

// Function to display previous orders on the "Previous Orders" page
function displayPreviousOrders() {
  const ordersContainer = document.getElementById("ordersContainer");

  // Check if the user is logged in
  if (!currentUser) {
    ordersContainer.innerHTML =
      "<p>Please log in to view your previous orders.</p>";
    return;
  }

  // Filter orders to show only the current user's orders
  const userOrders = orders.filter(
    (order) => order.customerName === currentUser.username
  );

  // Check if user has any previous orders
  if (userOrders.length === 0) {
    ordersContainer.innerHTML = "<p>No previous orders found.</p>";
    return;
  }

  // Display each order
  userOrders.forEach((order, index) => {
    const orderElement = document.createElement("div");
    orderElement.classList.add("order");

    // Ensure orderedItems is an array before mapping
    const items = Array.isArray(order.orderedItems) ? order.orderedItems : [];

    orderElement.innerHTML = `
        <h3>Order #${index + 1}</h3>
        <p><strong>Customer Name:</strong> ${order.customerName}</p>
        <p><strong>Phone Number:</strong> ${order.phoneNumber}</p>
        <h4>Ordered Items:</h4>
        <ul>
            ${items
              .map(
                (item) => `<li>${item.food} - Quantity: ${item.quantity}</li>`
              )
              .join("")}
        </ul>
        <p><strong>Total Price:</strong> $${order.total}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <hr>
    `;

    ordersContainer.appendChild(orderElement);
  });
}

// Ensure that the previous orders are displayed once the page loads
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("previous-orders.html")) {
    displayPreviousOrders();
  }
});

// -----------------profile ----------------

document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const phoneInput = document.getElementById("phone");

  // Load current user's data
  if (currentUser) {
    usernameInput.value = currentUser.username;
    phoneInput.value = currentUser.phone || "";
  }
});
// Update Profile functionality
document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.getElementById("profileForm");
    if (profileForm) {
      profileForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const updatedPhone = document.getElementById("phone").value;
        currentUser.phone = updatedPhone;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        alert("Profile updated successfully!");
      });
    }
  });
  
// Check if user is logged in and display Profile/Logout links
document.addEventListener("DOMContentLoaded", () => {
  const profileLink = document.getElementById("profileLink");
  const logoutButton = document.getElementById("logoutButton");

  if (currentUser) {
    profileLink.style.display = "inline"; // Show Profile link
    logoutButton.style.display = "inline"; // Show Logout button
  }
});


// -----------end profile.........

// Simulated Local Storage Data

// Load User Data
document.addEventListener("DOMContentLoaded", (event) => {
    // Load current user's data
    event.preventDefault();

    if (currentUser) {
      document.getElementById("username").value = currentUser.username;
      document.getElementById("phone").value = currentUser.phone || "";
      calculateTotal(); // Initialize total calculation for orders
      event.preventDefault();

    } else {
      alert("Please log in to view your profile.");
      window.location.href = "login.html";
      event.preventDefault();
    }
  
    // Event listener for profile form submission
    const profileForm = document.getElementById("profileForm");
    if (profileForm) {
      profileForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const updatedPhone = document.getElementById("phone").value;
        currentUser.phone = updatedPhone;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        alert("Profile updated successfully!");
      });
    }
  });

// Handle Profile Update
document.getElementById("profileForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const updatedPhone = document.getElementById("phone").value;

  // Update currentUser phone (in local storage)
  currentUser.phone = updatedPhone;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  alert("Profile updated successfully!");
});



// Sample User Data for Testing (You can comment this out after testing)
if (!localStorage.getItem("users")) {
    const sampleUsers = [
        { username: "testuser", password: "password123" },
        { username: "john", password: "doe123" },
    ];
    localStorage.setItem("users", JSON.stringify(sampleUsers));
}

// Login Function
function login(event) {
    event.preventDefault(); // Prevent the default form submission
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Find user in local storage
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        // Store the current user in local storage
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Login successful!"); // Provide feedback
        window.location.href = "order.html"; // Redirect to the order page
    } else {
        alert("Invalid credentials!"); // Provide feedback for invalid login
    }
}

// Event Listener for Document Loaded
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", login); // Add event listener for form submission
    }
});