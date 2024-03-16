
fetch("users.json")
.then(function(response){
    return response.json();
})
.then(data => {
    let placeholder = document.querySelector("#data-output");
    let out = "";

    const users = data.users;
      const user = users.find(function(user) {
        return user.username === localStorage.getItem("username")
        
      });

    for (const i of user.history) {
        out += `
        <tr>
            <td>${i.id}</td>
            <td>${i.product}</td>
            <td>${i.quantity}</td>
            <td>${i.price}</td>
            <td>${i.date}</td>
        </tr>  
        `
    }
    placeholder.innerHTML = out;
})

  
  