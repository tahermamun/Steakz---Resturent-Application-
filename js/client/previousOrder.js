let orders = JSON.parse(localStorage.getItem("orders")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let users = JSON.parse(localStorage.getItem("users")) || [];
console.log(orders);
console.log(users);
console.log(currentUser);

// Load Previous Orders
function displayPreviousOrders() {
  const ordersContainer = document.getElementById("ordersContainer");

  if (!currentUser) {
    ordersContainer.innerHTML =
      "<p>Please log in to view your previous orders.</p>";
    return;
  }

  const userOrders = orders.filter(
    (order) => order.customerUsername === currentUser.username
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
                <p><strong>Customer Name:</strong> ${order.customerUsername}</p>
                <p><strong>Phone Number:</strong> ${order.phoneNumber}</p>
                <h4>Ordered Items:</h4>
                <ul>${items
                  .map(
                    (item) =>
                      `<li>${item.food} - Quantity: ${item.quantity}</li>`
                  )
                  .join("")}</ul>
                <p><strong>Total Price:</strong> $${order.total}</p>
                <p><strong>Status:</strong> ${order.status}</p>
            
            `;

    ordersContainer.appendChild(orderElement);
  });
}

document.addEventListener("DOMContentLoaded", displayPreviousOrders);
