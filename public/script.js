document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const cartCount = document.getElementById('cart-count');
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    const loader = document.getElementById('loader');

    let itemCount = 0;
    let totalPrice = 0;
    const itemCounts = {};

    // Fetch products from the server
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            // Generate HTML for each product
            products.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('card');

                card.innerHTML = `
                    <img src="${product.imageUrl}" class="card-img" alt="${product.title}">
                    <h3 class="card-title">${product.title}</h3>
                    <p class="card-description">${product.desc}</p>
                    <p class="card-price">Rs. ${product.price}</p>
                    <button class="button add-button" data-price="${product.price}" data-id="${product.id}">Add to Cart (0)</button>
                    <span class="remove-icon" data-price="${product.price}" style="display:none;">🗑️</span>
                `;

                // Add event listener to the add button
                const addButton = card.querySelector('.add-button');
                const removeIcon = card.querySelector('.remove-icon');
                const itemId = product.title;
                itemCounts[itemId] = 0;

                addButton.addEventListener('click', () => {
                    const price = parseInt(addButton.getAttribute('data-price'), 10);
                    itemCount++;
                    totalPrice += price;
                    itemCounts[itemId]++;
                    addButton.textContent = `Add to Cart (${itemCounts[itemId]})`;

                    removeIcon.style.display = 'inline-block';

                    cartCount.textContent = `(${itemCount} | Rs. ${totalPrice})`;

                    showNotification(`${itemId} added to cart`);
                });

                // Add event listener to the remove icon
                removeIcon.addEventListener('click', () => {
                    if (itemCounts[itemId] > 0) {
                        const price = parseInt(removeIcon.getAttribute('data-price'), 10);
                        itemCount--;
                        totalPrice -= price;
                        itemCounts[itemId]--;
                        addButton.textContent = `Add to Cart (${itemCounts[itemId]})`;

                        if (itemCounts[itemId] === 0) {
                            removeIcon.style.display = 'none';
                        }

                        cartCount.textContent = `(${itemCount} | Rs. ${totalPrice})`;

                        showNotification(`${itemId} removed from cart`);
                    }
                });

                productContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    function showNotification(message) {
        notificationMessage.textContent = message;
        notification.style.display = 'block';
        loader.style.animation = 'none';
        // Trigger reflow to restart the animation
        loader.offsetWidth;
        loader.style.animation = '';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }
});
