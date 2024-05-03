window.onload = () => {
  let purchaseHistory = [];
  let purchaseDetails = {};
  let totalQuantity = 1;
  let totalPrice = 0;

  //get users for the nav bar to change
  getUsers();
 //get current user
 let currentUser = JSON.parse(localStorage.getItem("currentUser"));
 if (currentUser.role != "customer") {
   window.location.href = "main-page.html";
 }
 async function getPurchaseHistory() {
  const customerId = currentUser.id
  console.log("customer is: "+customerId)
  try {
    const response = await fetch(`/api/users/${customerId}`);
    const jsonData = await response.json();
    purchaseHistory = jsonData;
  } catch (error) {
    console.error("Error fetching JSON file:", error);
  }
}
  getPurchaseHistory();

 
  let selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  let productImage = document.querySelector("#productImage");
  let productName = document.querySelector("#productName");
  let productQuantity = document.querySelector("#productQuantity");
  let productPrice = document.querySelector("#price");
  let purchaseButton = document.querySelector("#purchaseButton");
  let message = document.querySelector("#message");
  let closeButton = document.querySelector("#closeButton");
  let balanceInfo = document.querySelector("#balanceInfo");

  if (selectedProduct) {
    productImage.src = selectedProduct.img;
    productName.innerHTML = "";
    productName.value = selectedProduct.name;
    productPrice.value = selectedProduct.price;
    
    balanceInfo.innerText = currentUser.balance;
  }

  //handling change quantity
  productQuantity.addEventListener("input", changeQuantity);
  function changeQuantity() {
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
  }

  //purchase and maintain history
  purchaseButton.addEventListener("click", purchase);
  function purchase() {
    event.preventDefault();
    totalPrice =
      parseInt(selectedProduct.price) * parseInt(productQuantity.value);
    if (currentUser.balance < totalPrice) {
      alert("Sorry you current balance is low");
      return;
    }
    event.preventDefault();

    const address = "Qatar"
    purchaseDetails = {
      customerId: currentUser.id,
      sellerId: selectedProduct.sellerId,
      productId: selectedProduct.productId,
      quantity: totalQuantity,
      totalPrice: totalPrice,
      date: new Date().toISOString,
      shippingAddress: address
    };


    //edit purchase table table
    const customerId = currentUser.id
    addPurchase(customerId, purchaseDetails)

    message.style.visibility = "visible";
  }

  async function addPurchase(customerId, purchaseDetails){
    try {
      const response = await fetch(`/api/users/${customerId}/purchase`, {
          method: 'POST',
          body: JSON.stringify(purchaseDetails),
      });
      if (!response.ok) {
          throw new Error('Failed to add object');
      }
      console.log('Object added successfully!');
  } catch (error) {
      console.error(error);
  }
  }

  closeButton.addEventListener("click", handleCloseBtn);
  function handleCloseBtn() {
    event.preventDefault();

    currentUser.balance = parseInt(currentUser.balance) - parseInt(totalPrice);

    //update currentuser in local storage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    console.log(currentUser.id)
    editBalance(currentUser.id, totalPrice);
    //window.location.href = "main-page.html";
  }
};

//edit current balance in database
async function editBalance(id, balance) {
  console.log("inside the async " + id)
  try {
    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: balance,
    });
    if (!response.ok) {
        throw new Error('Failed to add object');
    }
    console.log('Object added successfully!');
} catch (error) {
    console.error(error);
}
}


async function getUsers() {
  try {
    const response = await fetch('/api/users');
    const jsonData = await response.json();
    console.log(jsonData)
    allUsers = jsonData;
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

      const loginLogout = document.querySelector("#loginLogout");
      const logoutLink = document.createElement("a");
      const navusername = document.querySelector("#username");
      const role = document.createElement("a");
      const todo = document.querySelector("#todo");
      const anchorTodo = document.createElement("a");

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
