let list = [];
let allUsers = [];
let User = {};
const textInput = document.getElementById("search");
const button = document.getElementById("searchButton");

window.onload = function () {
  try {
    getUsers();

    getItems();
    displayOnThePage(list);
  } catch (error) {
    alert(error);
  }
};

textInput.addEventListener("input", function () {
  let filterBy = textInput.value.trim();
  const filteredItems = list.filter((item) => item.name.startsWith(filterBy));
  displayOnThePage(filteredItems);
});

async function getItems(filterBy) {
  try {
    const response = await fetch("../items.json");
    const jsonData = await response.json();
    let { items } = jsonData;
    list = items;
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
    img.src = product.image;
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
        alert("you are not permitted to purchas");
      } else {
        alert("Please login first.");
        window.location.href = "login-page.html";
      }
    });

    article.appendChild(button);

    productsContainer.appendChild(article);
  });
}

////////////////////////////////nav bar related

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


document.getElementById('home-link').addEventListener('click', function(event) {
  event.preventDefault()
  document.getElementById('home').classList.add('active');
  document.getElementById('mission').classList.remove('active');
  document.getElementById('vision').classList.remove('active');
 

});

document.getElementById('mission-link').addEventListener('click', function(event) {
  event.preventDefault()
  document.getElementById('mission').classList.add('active');
  document.getElementById('home').classList.remove('active');
  document.getElementById('vision').classList.remove('active');
  

});


document.getElementById('vision-link').addEventListener('click', function(event) {
  event.preventDefault()
  document.getElementById('vision').classList.add('active');
  document.getElementById('home').classList.remove('active');
  document.getElementById('mission').classList.remove('active');
  

});

