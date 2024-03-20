let allUsers = [];
let User = {};
window.onload = () => {
  getUsers();
  ///////////////////upload new product

  document
    .getElementById("uploadForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let formData = new FormData(this);
      fetch("http://localhost:3000/submit", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = "products.html";
          }
        })
        .catch((error) => {
          alert("Error submitting form:", error);
        });
    });
  ///////////////navbar

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
        const sellerId = document.getElementById("sellerId");
        sellerId.value = User.Id;

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
          todo1.appendChild(anchorTodo1);

          anchorTodo2.textContent = "Products";
          anchorTodo2.href = "/products.html";
          todo2.appendChild(anchorTodo2);

          anchorTodo.textContent = "New Items";
          anchorTodo.href = "/newitems.html";
          anchorTodo.style.color = "white";
          anchorTodo.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
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
