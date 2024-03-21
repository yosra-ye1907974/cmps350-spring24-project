window.onload = () => {
  let purchaseHistory = [];
  let purchaseDetails = {};
  let totalQuantity = 1;
  let totalPrice = 0;

  //get users for the nav bar to change
  getUsers();
  let data = JSON.parse(localStorage.getItem("purchaseHistory"));

  if (data) {
    purchaseHistory = data;
  }

  //get current user
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser.role != "customer") {
    window.location.href = "main-page.html";
  }

  let selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  let productImage = document.getElementById("productImage");
  let productName = document.getElementById("productName");
  let productQuantity = document.getElementById("productQuantity");
  let productPrice = document.getElementById("price");
  let purchaseButton = document.getElementById("purchaseButton");
  let message = document.getElementById("message");
  let closeButton = document.getElementById("closeButton");
  let balanceInfo = document.getElementById("balanceInfo");

  if (selectedProduct) {
    productImage.src = selectedProduct.image;
    productName.innerHTML = "";
    productName.value = selectedProduct.name;
    productPrice.value = selectedProduct.price;

    // //styling 
    // if (parseInt(currentUser.balance) < 200) {
    //   balanceInfo.style.color = "red";
    // } else {
    //   balanceInfo.style.color = "green";
    // }

    balanceInfo.innerText = currentUser.balance;
  }


  productQuantity.addEventListener("input", (event) => {
    let val = parseInt(event.target.value);
    if (val > 0) {
      productPrice.value =
        parseInt(event.target.value) * parseInt(selectedProduct.price) ||
        selectedProduct.price;
      purchaseButton.disabled = false;
      totalQuantity = val;
      totalPrice =
        parseInt(selectedProduct.price) * parseInt(productQuantity.value);
    } else {
      //no quantity 
      purchaseButton.disabled = true;
    }
  });

  //generate unique id for the purchase
  function uniqueId() {

    //change this?
    // const id =
    //   new Date().toISOString().slice(0, 10).replace(/-/g, "").toString() +
    //   Math.floor(Math.random() * 1000);
    // return parseInt(id);

    const id = Math.floor(Math.random() * 1000) + new Date().getTime();
    return id;
  }

  //purchase and maintain history
  purchaseButton.addEventListener("click", () => {
    event.preventDefault();
    totalPrice =
      parseInt(selectedProduct.price) * parseInt(productQuantity.value);
    if (currentUser.balance < totalPrice) {
      alert("Sorry you current balance is low");
      return;
    }
    event.preventDefault();
    purchaseDetails = {
      orderId: uniqueId(),
      ...currentUser,
      ...selectedProduct,
      totalQuantity,
      totalPrice,
      orderDate: new Date().toDateString(),
    };
    purchaseHistory = [...purchaseHistory, purchaseDetails];
    localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));

    message.style.visibility = "visible";
  });
  closeButton.addEventListener("click", () => {
    event.preventDefault();

    currentUser.balance = parseInt(currentUser.balance) - parseInt(totalPrice);

    //update currentuser in local storage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    editBalance(currentUser, totalPrice);
    window.location.href = "main-page.html";
  });
};

//edit current balance in json
function editBalance(seluser, balance) {
  const data = {
    username: seluser.username,
    password: seluser.password,
    balance,
  };

  //make call for edit balance in json file - should we change this??
  fetch("http://localhost:3000/currentBalance", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Balance updated");
      } else {
        console.error(response.statusText);
      }
    })
    .catch((error) => {
      console.error("Request failed:", error);
    });
}


//fetch users from json file
async function getUsers() {
  try {
    const response = await fetch("../users.json");
    const jsonData = await response.json();
    const { users } = jsonData;
    allUsers = users;

    //get current user
    getCurrentUser();
  } catch (error) {
    console.error("Error fetching JSON file:", error);
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
