let allUsers = [];
let User = {};
window.onload = () => {
  getUsers();

  function productRecord(list) {
    let historyTable = document.querySelector("#history-table");
    purchaseHistoryData = list.filter((item) => {
      return item.sellerId == User.Id;
    });
    let customerName = document.querySelector("#title");
    purchaseHistoryData.forEach((element) => {
      let row = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let proPhoto = document.createElement("img");

      td1.textContent = element.productId;
      td2.textContent = element.name;
      td3.textContent = element.price;
      proPhoto.src = element.image;
      proPhoto.style.width = "70px";
      proPhoto.style.height = "60px";
      proPhoto.style.borderRadius = "5px";
      td4.appendChild(proPhoto);

      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      row.appendChild(td4);

      historyTable.appendChild(row);
    });
  }

  //for reading items to display
  async function getItems() {
    try {
      const response = await fetch("../items.json");
      const jsonData = await response.json();

      let { items } = jsonData;
      list = items;
      if (list) {
        productRecord(list);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //for navigation bar change
  async function getUsers() {
    try {
      const response = await fetch("../users.json");
      const jsonData = await response.json();
      const { users } = jsonData;
      allUsers = users;

      getCurrentUser();
    } catch (error) {
      console.error(error);
    }
  }

  function getCurrentUser() {
    const retrievedData = JSON.parse(localStorage.getItem("currentUser"));

    if (retrievedData) {
      let user = allUsers.find((u) => {
        return (
          u.username === retrievedData.username &&
          u.password === retrievedData.password
        );
      });
      if (user) {
        User = user;
        getItems();
        const loginLogout = document.querySelector("#loginLogout");
        const logoutLink = document.createElement("a");
        const navusername = document.querySelector("#username");
        const role = document.createElement("a");
        const anchorTodo = document.createElement("a");
        const anchorTodo1 = document.createElement("a");
        const anchorTodo2 = document.createElement("a");
        const todo1 = document.querySelector("#todo1");
        const todo2 = document.querySelector("#todo2");
        const todo = document.querySelector("#todo");

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
          anchorTodo1.href = "/sale-record.html";
          todo1.appendChild(anchorTodo1);

          anchorTodo2.textContent = "Products";
          anchorTodo2.style.color = "white";
          anchorTodo2.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
          anchorTodo2.href = "/products.html";
          todo2.appendChild(anchorTodo2);

          anchorTodo.textContent = "New Items";
          anchorTodo.href = "/sell-item.html";
          todo.appendChild(anchorTodo);
        } else if (user.role === "admin") {
          anchorTodo.textContent = "Dashboard";
          anchorTodo.href = "/dashboard.html";
          todo.appendChild(anchorTodo);
        }
        //logout
        logoutLink.textContent = "Logout";
        logoutLink.style.cursor = "pointer";
        loginLogout.innerHTML = ""; // Clear existing content
        
        loginLogout.appendChild(logoutLink);
        logoutLink.addEventListener("click", function () {
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
