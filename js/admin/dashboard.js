// Simulated Local Storage Data
let users = JSON.parse(localStorage.getItem("users")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let employees = JSON.parse(localStorage.getItem("employees")) || null;

const customer = document.getElementById("totalCustomers");
const employee = document.getElementById("totalEmployees");
const totalOrders = document.getElementById("totalOrders");
const completeOrders = document.getElementById("completedOrders");
const totalSales = document.getElementById("totalSales");

const totalCompleteOrder = orders.filter(
  (order) => order.status === "Completed"
).length;
const totalSalesAmount = orders.reduce(
  (sum, order) => sum + parseFloat(order.total),
  0
);

document.addEventListener("DOMContentLoaded", (event) => {
  let adminLogged = JSON.parse(localStorage.getItem("adminLogged"));
  if (!adminLogged || null) {
    alert("Please Login to Admin Panel");
    window.location.href = "admin-login.html";
  }

  customer.innerHTML = users.length;
  employee.innerHTML = employees.length;
  totalOrders.innerHTML = orders.length;
  completeOrders.innerHTML = totalCompleteOrder;
  totalSales.innerHTML = "$" + totalSalesAmount;
});
