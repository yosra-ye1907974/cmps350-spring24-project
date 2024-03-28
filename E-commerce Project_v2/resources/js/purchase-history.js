let allUsers = [];
let User = {};
window.onload = () => {
  window.loadTable = loadTable
  getUsers();
  loadTable()
  //fetching the users from user.json
  async function getUsers() {
    try {
      const response = await fetch("../users.json");
      const jsonData = await response.json();
      const { users } = jsonData;
      allUsers = users;

      //getting the current logged in user
      getCurrentUser();
    } catch (error) {
      console.error("Error fetching JSON file:", error);
    }
  }

  function getCurrentUser() {

    //getting the current user from localStorage
    const retrievedData = JSON.parse(localStorage.getItem("currentUser"));
    console.log(retrievedData);
    console.log(allUsers);
    if (retrievedData) {
      let user = allUsers.find((u) => {
        return (
          u.username === retrievedData.username &&
          u.password === retrievedData.password
        );
      });

      console.log(user);
      if (user) {
        User = user;

        const loginLogout = document.getElementById("loginLogout");
        const logoutLink = document.createElement("a");
        const navusername = document.getElementById("username");
        const role = document.createElement("a");
        const todo = document.getElementById("todo");
        const anchorTodo = document.createElement("a");

        // //the green styling 
        // role.style.color = "green";
        // role.style.textDecoration = "none";
        // role.style.fontSize = "16px";
        // role.style.textTransform = "capitalize";
        ///show user name
        role.textContent = `${user.username} ( ${user.role} )`;
        navusername.appendChild(role);

        //assign role - change nav based on role
        if (user.role === "customer") {
          anchorTodo.textContent = "Purchase History";
          anchorTodo.href = "/purchase-history.html";
          anchorTodo.style.color = "white";
          anchorTodo.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
          todo.appendChild(anchorTodo);
        } else if (user.role === "seller") {
          anchorTodo.textContent = "Sale Record";
          anchorTodo.href = "/sale-record.html";
          todo.appendChild(anchorTodo);
        } else if (user.role === "admin") {
          anchorTodo.textContent = "Dashboard";
          anchorTodo.href = "/dashboard.html";
          todo.appendChild(anchorTodo);
        }
        // logoutLink.href = "#logout"; // Add logout action
        logoutLink.textContent = "Logout";
        logoutLink.style.cursor = "pointer";
        loginLogout.innerHTML = ""; // Clear existing content
      
        loginLogout.appendChild(logoutLink);
        logoutLink.addEventListener("click", function () {
          console.log(logoutLink.textContent);
          if (logoutLink.textContent === "Logout") {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("selectedProduct");
            User = {};
            logoutLink.textContent = "Login";
            loginLogout.innerHTML = "";
            loginLogout.appendChild(logoutLink);
            window.location.reload();
            window.location.href = "main-page.html";
          }
        });

      }
    }
  }
};

function loadTable() {
  let historyTable = document.getElementById("history-table");
  let purchaseHistoryData = JSON.parse(localStorage.getItem("purchaseHistory"));
  let customerName = document.getElementById("title");

  if (purchaseHistoryData) {
    //changing h1 content
    customerName.textContent =
      purchaseHistoryData[0].username + "'s Purchasing History";
  }
  console.log(purchaseHistoryData);
  if (purchaseHistoryData) {

    //for each item in the purchaseHistoryData list create 
    purchaseHistoryData.forEach((element) => {
      let row = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let td5 = document.createElement("td");
      let td6 = document.createElement("td");
      td1.textContent = element.orderId;
      td2.textContent = element.name;
      td6.textContent = element.price;
      td3.textContent = element.totalQuantity;
      td4.textContent = element.totalPrice;
      td5.textContent = element.orderDate;
      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td6);
      row.appendChild(td3);
      row.appendChild(td4);
      row.appendChild(td5);

      //after creating the row add it to the table
      historyTable.appendChild(row);
    });
  } else {

    //if there's no items purchased yet
    const purchase = document.getElementById("purchase-history");
    const para = document.createElement("p");
    para.style.textAlign = "center";
    para.textContent = "You have not purchase any thing yet.";
    purchase.appendChild(para);
  }


}
