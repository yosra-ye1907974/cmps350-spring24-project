let allUsers = [];
let User = {};
window.onload = () => {
  getUsers();

  function saleRecord() {
    let historyTable = document.getElementById("history-table");
    let purchaseHistoryData = JSON.parse(
      localStorage.getItem("purchaseHistory")
    );

    purchaseHistoryData = purchaseHistoryData.filter((item) => {
      return item.sellerId == User.Id;
    });
    let customerName = document.getElementById("title");

    //   if (purchaseHistoryData) {
    //     customerName.textContent =
    //       purchaseHistoryData[0].username + "'s Purchasing History";
    //   }
    console.log(purchaseHistoryData);
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

      historyTable.appendChild(row);
    });
  }
  // alert(historyTable);

  ///////////////navbar

  async function getUsers() {
    try {
      const response = await fetch("../users.json");
      const jsonData = await response.json();
      const { users } = jsonData;
      allUsers = users;

      getCurrentUser();
    } catch (error) {
      console.error("Error fetching JSON file:", error);
    }
  }

  function getCurrentUser() {
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
        saleRecord();
        const loginLogout = document.getElementById("loginLogout");
        const logoutLink = document.createElement("a");
        const navusername = document.getElementById("username");
        const role = document.createElement("a");
        const anchorTodo = document.createElement("a");
        const anchorTodo1 = document.createElement("a");
        const anchorTodo2 = document.createElement("a");
        const todo1 = document.getElementById("todo1");
        const todo2 = document.getElementById("todo2");
        const todo = document.getElementById("todo");

        role.style.color = "green";
        role.style.textDecoration = "none";
        role.style.fontSize = "16px";
        role.style.textTransform = "capitalize";
        ///show user name
        role.textContent = `${user.username} ( ${user.role} )`;
        navusername.appendChild(role);

        //assign role
        if (user.role === "customer") {
          anchorTodo.textContent = "Purchase History";
          anchorTodo.href = "/purchase-history.html";
          todo.appendChild(anchorTodo);
        } else if (user.role === "seller") {
          anchorTodo1.textContent = "Sales";
          anchorTodo1.href = "/sell-item.html";
          anchorTodo1.style.color = "white";
          anchorTodo1.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
          todo1.appendChild(anchorTodo1);

          anchorTodo2.textContent = "Products";
          anchorTodo2.href = "/products.html";
          todo2.appendChild(anchorTodo2);

          anchorTodo.textContent = "New Items";
          anchorTodo.href = "/newitems.html";
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
        //////////////////////////////////////
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

        ///////////////////
      }
    }
  }
};
