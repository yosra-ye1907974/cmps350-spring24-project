let currentUser = {};
let allUsers = [];
window.onload = () => {
  getUsers();
};

async function getUsers() {
  try {
    const response = await fetch("../users.json");
    const jsonData = await response.json();
    const { users } = jsonData;
    allUsers = users;
  } catch (error) {
    console.error("Error fetching JSON file:", error);
  }
}

document.querySelector("#login").addEventListener("submit", login);

function login() {
  event.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  let authenticatedUser = allUsers.find((u) => {
    return u.username === username && u.password === password;
  });

  if (authenticatedUser) {
    currentUser = { ...authenticatedUser };

    //save it in memory
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.location.href = "main-page.html";
  } else {
    alert("Invalid username or password");
  }
}
