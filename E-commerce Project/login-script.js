document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    //Get input values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Load users from JSON file
  fetch('users.json')
    .then(response => response.json())
    .then(data => {
      // Check if the entered credentials match any user
      const users = data.users;
      const authenticatedUser = users.find(function(user) {
        return user.username === username && user.password === password;
      });

      if (authenticatedUser) {
        alert('Login successful');
        // Redirect or perform further actions after successful login
        if(authenticatedUser.role == "customer")
          window.location.href = 'main-page.html';
        else if (authenticatedUser.role == "seller") 
          window.location.href = 'main-page.html';
        else if (authenticatedUser.role == "admin") //admin responsibilities??
          window.location.href = 'main-page.html';

      } else {
        alert('Invalid username or password');
      }
    })
    .catch(error => console.error('Error:', error));
});