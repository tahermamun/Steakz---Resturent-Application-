// Simulated Local Storage Data
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Function to render employee list
function renderEmployeeList() {
  const employeeList = document.getElementById("employeeList");
  employeeList.innerHTML = ""; 

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
  event.preventDefault();

  const employeeName = document.getElementById("employeeName").value;
  const employeeId = document.getElementById("employeeId").value;

  employees.push({ name: employeeName, employeeId: employeeId });
  localStorage.setItem("employees", JSON.stringify(employees));

  document.getElementById("addEmployeeForm").reset();

  renderEmployeeList();
}

// Function to delete an employee
function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));

  renderEmployeeList();
}

document
  .getElementById("addEmployeeForm")
  .addEventListener("submit", addEmployee);

// Render the employee list on page load
document.addEventListener("DOMContentLoaded", () => {
  let adminLogged = JSON.parse(localStorage.getItem("adminLogged"));
  if (!adminLogged || null) {
    alert("Please Login to Admin Panel");
    window.location.href = "admin-login.html";
  }
  renderEmployeeList();
});
