// Admin Login Function
let adminCredentials = { username: "admin", password: "admin123" };

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
if (!localStorage.getItem("orders")) {
  const sampleData = [
    {
      customerUsername: "mikejohnson",
      phoneNumber: "01324567890",
      orderedItems: [
        {
          food: "Grilled Chicken",
          quantity: "3",
        },
        {
          food: "Caesar Salad",
          quantity: "1",
        },
      ],
      total: "45.50",
      status: "Completed",
    },
    {
      customerUsername: "lucyadams",
      phoneNumber: "01476543210",
      orderedItems: [
        {
          food: "Pasta Alfredo",
          quantity: "1",
        },
        {
          food: "Grilled Chicken",
          quantity: "2",
        },
      ],
      total: "34.75",
      status: "Completed",
    },
    {
      customerUsername: "jameslee",
      phoneNumber: "01876543211",
      orderedItems: [
        {
          food: "Burger Deluxe",
          quantity: "2",
        },
        {
          food: "Pizza Margherita",
          quantity: "1",
        },
      ],
      total: "30.50",
      status: "Pending",
    },
    {
      customerUsername: "emilywhite",
      phoneNumber: "01234678901",
      orderedItems: [
        {
          food: "Sushi Roll",
          quantity: "2",
        },
        {
          food: "Caesar Salad",
          quantity: "2",
        },
      ],
      total: "28.80",
      status: "Delivered",
    },
    {
      customerUsername: "tomharris",
      phoneNumber: "01567891234",
      orderedItems: [
        {
          food: "Grilled Chicken",
          quantity: "1",
        },
        {
          food: "Pasta Alfredo",
          quantity: "1",
        },
        {
          food: "Sushi Roll",
          quantity: "3",
        },
      ],
      total: "55.70",
      status: "Completed",
    },
  ];

  localStorage.setItem("orders", JSON.stringify(sampleData));
}

if (!localStorage.getItem("employees")) {
  const sampleData = [
    { name: "Sarah Lee", employeeId: "1402" },
    { name: "John Doe", employeeId: "6789" },
    { name: "Emily Clark", employeeId: "9487" },
    { name: "Michael Scott", employeeId: "4532" },
  ];

  localStorage.setItem("employees", JSON.stringify(sampleData));
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
