document.addEventListener("DOMContentLoaded", function() {
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            const itemsContainer = document.getElementById('items-container');
            let itemsHTML = '';

            data.items.forEach(item => {
                itemsHTML += `
                    <article class="item">
                        <figure>
                            <img src="${item.image}" alt="image">
                            <figcaption>${item.name}</figcaption>
                            <figcaption>${item.price}</figcaption>
                        </figure>
                        <button>Buy this item</button>
                    </article>
                `;
            });

            itemsContainer.innerHTML = itemsHTML;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
