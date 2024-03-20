let list = [];
let allUsers = [];
let User = {};
window.onload = function () {
  try {
    getUsers();
  } catch (error) {
    alert(error);
  }
};

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

      const loginLogout = document.getElementById("loginLogout");
      const logoutLink = document.createElement("a");
      const navusername = document.getElementById("username");
      const role = document.createElement("a");
      const todo = document.getElementById("todo");
      const anchorTodo = document.createElement("a");

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
        anchorTodo.textContent = "Sale Record";
        anchorTodo.href = "/sell-item.html";
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

      ///////////////////
    }
  }
}

//////////////////////////////////////////nav bar
