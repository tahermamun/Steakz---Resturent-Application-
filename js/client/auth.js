// Simulated Local Storage Data
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

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

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const usernameExists = existingUsers.some(
    (user) => user.username === newUser.username
  );
  if (usernameExists) {
    alert("Username already exists. Please choose a different one.");
    return;
  }

  existingUsers.push(newUser);

  localStorage.setItem("users", JSON.stringify(existingUsers));

  document.getElementById("registerForm").reset();

  alert("Registration successful! You can now log in.");
  window.location.href = "login.html";
}



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
