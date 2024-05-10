let list = [];
let allUsers = [];
let User = {};
const textInput = document.querySelector("#search");
const button = document.querySelector("#searchButton");

window.onload = function () {
  try {
    getUsers();
    getItems();
    displayOnThePage(list);
  } catch (error) {
    alert(error);
  }
};

//Search Functionality
textInput.addEventListener("input", search);

async function search(){
  let filterBy = textInput.value.trim();
  try {
    const response = await fetch(`/api/products?name=${filterBy}`);
    const jsonData = await response.json();
    console.log(jsonData);
    list = jsonData;
    displayOnThePage(list);
  } catch (error) {
    console.error("Error fetching JSON file:", error);
  }
}

//Fetch all products 
async function getItems() {
  try {
    const response = await fetch('/api/products');
    const jsonData = await response.json();
    console.log(jsonData)
    list = jsonData;
    displayOnThePage(list);
  } catch (error) {
    console.error("Error fetching JSON file:", error);
  }
}

function displayOnThePage(products) {
  const productsContainer = document.querySelector(".products-container");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const article = document.createElement("article");
    article.classList.add("item");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = product.img;
    img.alt = product.name;
    figure.appendChild(img);

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = product.name + " ( " + product.price + " )";
    figure.appendChild(figcaption);

    article.appendChild(figure);

    const button = document.createElement("button");
    button.textContent = "Buy it";
    button.setAttribute("href", "./buy-item.html");
    button.setAttribute("id", "buyButton");
    button.style.margin = "15px";
    button.addEventListener("click", function () {
      if (User && User.role === "customer") {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "buy-item.html";
      } else if (User && User.role === "seller") {
        alert("you are not permitted to purchase items");
      } else {
        alert("Please login first.");
        window.location.href = "login-page.html";
      }
    });

    article.appendChild(button);

    productsContainer.appendChild(article);
  });
}

//navigation bar 

async function getUsers() {
  try {
    //username=${username}&password=${password}&role=${role}
    const response = await fetch('/api/users');
    const jsonData = await response.json();
    console.log(jsonData)
    // const { users } = jsonData;
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
    console.log("this is the userr;;"+user);
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

      //assign role
      if (user.role === "customer") {
        anchorTodo.textContent = "Purchase History";
        anchorTodo.href = "/purchase-history.html";
        todo.appendChild(anchorTodo);
      } else if (user.role === "seller") {
        anchorTodo.textContent = "Sale Record";
        anchorTodo.href = "/sale-record.html";
        todo.appendChild(anchorTodo);
      } else if (user.role === "admin") {
        anchorTodo.textContent = "Statistics";
        anchorTodo.href = "./statistics";
        todo.appendChild(anchorTodo);
      }

      // logoutLink.href = "#logout"; // Add logout action
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

//hide home/mission/vision sections and display them when they are clicked
document.querySelector('#home-link').addEventListener('click', function(event) {
  event.preventDefault()
  document.querySelector('#home').classList.add('active');
  document.querySelector('#mission').classList.remove('active');
  document.querySelector('#vision').classList.remove('active');

});

document.querySelector('#mission-link').addEventListener('click', function(event) {
  event.preventDefault()
  document.querySelector('#mission').classList.add('active');
  document.querySelector('#home').classList.remove('active');
  document.querySelector('#vision').classList.remove('active');
  

});


document.querySelector('#vision-link').addEventListener('click', function(event) {
  event.preventDefault()
  document.querySelector('#vision').classList.add('active');
  document.querySelector('#home').classList.remove('active');
  document.querySelector('#mission').classList.remove('active');
  

});

