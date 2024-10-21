// Simulated Local Storage Data
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Populate Customer Name from Login Info

const populateUserData = () => {
  const orderSection = document.getElementById("orderForm");
  if (!currentUser) {
    orderSection.innerHTML = "<p>Please log in to view your orders.</p>";
    return;
  }
  if (currentUser && document.getElementById("customerName")) {
    document.getElementById("customerName").value = currentUser.fullName;
    document.getElementById("customer_username").value = currentUser.username;
    document.getElementById("phoneNumber").value = currentUser.phone;
  }
};

// Function to Add Another Food Item
function addFoodItem() {
  const foodList = document.getElementById("foodList");
  const newFoodItem = document.createElement("div");
  newFoodItem.classList.add("food-item");

  // Create new food item input structure
  newFoodItem.innerHTML = `
            <label for="food">Select Food:</label>
           <select class="foodSelect input-style" onchange="calculateTotal()"   style="width: 40%;">
                <option value="Grilled Chicken" data-price="12.99">Grilled Chicken - $12.99</option>
                <option value="Pasta Alfredo" data-price="9.99">Pasta Alfredo - $9.99</option>
                <option value="Pizza Margherita" data-price="14.99">Pizza Margherita - $14.99</option>
                <option value="Sushi Roll" data-price="8.99">Sushi Roll - $8.99</option>
                <option value="Burger Deluxe" data-price="11.99">Burger Deluxe - $11.99</option>
                <option value="Caesar Salad" data-price="7.99">Caesar Salad - $7.99</option>
            </select>

            <label for="quantity">Quantity:</label>
            <input type="number" class="quantity input-style" min="1" value="1"  style="width: 10%;" onchange="calculateTotal()" required>
            <button type="button" onclick="removeFoodItem(this)">Remove</button>
        `;

  foodList.appendChild(newFoodItem); // Append new food item to list
  calculateTotal();
}

// Function to Remove Food Item
function removeFoodItem(button) {
  const foodItem = button.parentElement;
  foodItem.remove();
  calculateTotal();
}

// Function to Calculate Total Price
function calculateTotal() {
  const foodSelects = document.querySelectorAll(".foodSelect");
  const quantities = document.querySelectorAll(".quantity");
  let totalPrice = 0;

  foodSelects.forEach((foodSelect, index) => {
    const foodPrice = parseFloat(
      foodSelect.selectedOptions[0].getAttribute("data-price")
    );
    const quantity = parseInt(quantities[index].value);
    totalPrice += foodPrice * quantity;
  });

  document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);
}

// Function to Place Order
function placeOrder(event) {
  event.preventDefault();

  const customerName = currentUser.customerName;
  const customerUsername = currentUser.username;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const foodSelects = document.querySelectorAll(".foodSelect");
  const quantities = document.querySelectorAll(".quantity");

  const orderedItems = Array.from(foodSelects).map((foodSelect, index) => ({
    food: foodSelect.value,
    quantity: quantities[index].value,
  }));

  const total = document.getElementById("totalPrice").innerText;

  const newOrder = {
    customerName,
    customerUsername,
    phoneNumber,
    orderedItems,
    total,
    status: "In Progress",
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order placed successfully!");
  window.location.href = "previous-orders.html";
}

document.addEventListener("DOMContentLoaded", () => {
  populateUserData();

  calculateTotal();
});


