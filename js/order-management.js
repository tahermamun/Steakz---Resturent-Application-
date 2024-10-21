
// order-management.js
// admin-order-management.js

// Function to display all orders
function displayAllOrders() {
    const adminOrdersTable = document.getElementById("adminOrdersTable");
    
    // Clear the table content before adding new rows
    adminOrdersTable.innerHTML = ''; 

    // Get all orders from local storage
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log(allOrders);  // Debugging statement

    // If no orders are found, display a message
    if (allOrders.length === 0) {
        adminOrdersTable.innerHTML = `<tr><td colspan="6">No orders found.</td></tr>`;
        return;
    }

    // Loop through all orders and display them in the table
    allOrders.forEach((order, index) => {
        const items = order.orderedItems.map(item => `${item.food} (x${item.quantity})`).join(", ");

        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${order.customerName}</td>
                <td>${items}</td>
                <td>$${order.total.toFixed(2)}</td>
                <td>
                    <select onchange="updateOrderStatus(this, ${index})">
                        <option value="In Progress" ${order.status === "In Progress" ? "selected" : ""}>In Progress</option>
                        <option value="Completed" ${order.status === "Completed" ? "selected" : ""}>Completed</option>
                        <option value="Cancelled" ${order.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
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

    // Update the order status in the orders array
    orders[orderIndex].status = newStatus;
    localStorage.setItem("orders", JSON.stringify(orders));

    alert(`Order status updated to "${newStatus}"`);
}

// Function to delete an order
function deleteOrder(orderIndex) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Remove the order from the array
    orders.splice(orderIndex, 1);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Refresh the order list
    document.getElementById("adminOrdersTable").innerHTML = ""; // Clear the table
    displayAllOrders(); // Re-display orders
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", () => {
    console.log("Page Loaded");  // Debugging statement
    displayAllOrders();
});




// order-management.js
// admin-order-management.js

// Function to display all orders
function displayAllOrders() {
    const adminOrdersTable = document.getElementById("adminOrdersTable");

    // Get all orders from local storage
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log(allOrders);  // Debugging statement

    // If no orders are found, display a message
    if (allOrders.length === 0) {
        adminOrdersTable.innerHTML = `<tr><td colspan="6">No orders found.</td></tr>`;
        return;
    }
    adminOrdersTable.innerHTML ="" 

    // Loop through all orders and display them in the table
    allOrders.forEach((order, index) => {
        const items = order.orderedItems.map(item => `${item.food} (x${item.quantity})`).join(", ");
console.log(order);
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${order.customerName}</td>
                <td>${items}</td>
                
                <td>$${order.total}</td>
                <td>
                    <select onchange="updateOrderStatus(this, ${index})">
                        <option value="In Progress" ${order.status === "In Progress" ? "selected" : ""}>In Progress</option>
                        <option value="Completed" ${order.status === "Completed" ? "selected" : ""}>Completed</option>
                        <option value="Cancelled" ${order.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
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

    // Update the order status in the orders array
    orders[orderIndex].status = newStatus;
    localStorage.setItem("orders", JSON.stringify(orders));

    alert(`Order status updated to "${newStatus}"`);
}

// Function to delete an order
function deleteOrder(orderIndex) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Remove the order from the array
    orders.splice(orderIndex, 1);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Refresh the order list
    document.getElementById("adminOrdersTable").innerHTML = ""; // Clear the table
    displayAllOrders(); // Re-display orders
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", () => {
    console.log("Page Loaded or-ma");  // Debugging statement
    displayAllOrders();
});

