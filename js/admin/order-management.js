// Function to display all orders
function displayAllOrders() {
  const adminOrdersTable = document.getElementById("adminOrdersTable");
  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

  if (allOrders.length === 0) {
    adminOrdersTable.innerHTML = `<tr><td colspan="6">No orders found.</td></tr>`;
    return;
  }
  adminOrdersTable.innerHTML = "";

  // Loop through all orders and display them in the table
  allOrders.forEach((order, index) => {
    const items = order.orderedItems
      .map((item) => `${item.food} (x${item.quantity})`)
      .join(", ");
    const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${order.customerUsername}</td>
                <td>${items}</td>
                
                <td>$${order.total}</td>
                <td>
                    <select onchange="updateOrderStatus(this, ${index})">
                        <option value="In Progress" ${
                          order.status === "In Progress" ? "selected" : ""
                        }>In Progress</option>
                        <option value="Completed" ${
                          order.status === "Completed" ? "selected" : ""
                        }>Completed</option>
                        <option value="Cancelled" ${
                          order.status === "Cancelled" ? "selected" : ""
                        }>Cancelled</option>
                    </select>
                </td>
                <td><button onclick="deleteOrder(${index})">Delete</button></td>
            </tr>
        `;
    adminOrdersTable.innerHTML += row;
  });
}

// Function to update order status
function updateOrderStatus(selectElement, orderIndex) {
  const newStatus = selectElement.value;
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders[orderIndex].status = newStatus;
  localStorage.setItem("orders", JSON.stringify(orders));

  alert(`Order status updated to "${newStatus}"`);
}

// Function to delete an order
function deleteOrder(orderIndex) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.splice(orderIndex, 1);
  localStorage.setItem("orders", JSON.stringify(orders));

  document.getElementById("adminOrdersTable").innerHTML = ""; 
  displayAllOrders();
}

document.addEventListener("DOMContentLoaded", () => {
  let adminLogged = JSON.parse(localStorage.getItem("adminLogged"));
  if (!adminLogged || null) {
    alert("Please Login to Admin Panel");
    window.location.href = "admin-login.html";
  }

  displayAllOrders();
});
