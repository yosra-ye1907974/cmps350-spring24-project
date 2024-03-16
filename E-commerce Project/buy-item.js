fetch('items.json').then(function(response){
    return response.json();
})
.then(data => {
    
})


document.getElementById('buy-form').addEventListener('submit', function(event) {

    const quantity = document.getElementById('quantity').value;
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    
})