document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add-button');
    const cartCount = document.getElementById('cart-count');
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    const loader = document.getElementById('loader');

    let itemCount = 0;
    let totalPrice = 0;
    const itemCounts = {};

    addButtons.forEach(button => {
        const itemId = button.parentElement.querySelector('.card-title').textContent;
        itemCounts[itemId] = 0;

        button.addEventListener('click', () => {
            const price = parseInt(button.getAttribute('data-price'), 10);
            itemCount++;
            totalPrice += price;
            itemCounts[itemId]++;
            button.textContent = `Add to Cart (${itemCounts[itemId]})`;

            const removeIcon = button.parentElement.querySelector('.remove-icon');
            removeIcon.style.display = 'inline-block';

            cartCount.textContent = `(${itemCount} | Rs. ${totalPrice})`;

            showNotification(`${itemId} added to cart`);
        });

        const removeIcon = button.parentElement.querySelector('.remove-icon');
        removeIcon.addEventListener('click', () => {
            if (itemCounts[itemId] > 0) {
                const price = parseInt(removeIcon.getAttribute('data-price'), 10);
                itemCount--;
                totalPrice -= price;
                itemCounts[itemId]--;
                button.textContent = `Add to Cart (${itemCounts[itemId]})`;

                if (itemCounts[itemId] === 0) {
                    removeIcon.style.display = 'none';
                }

                cartCount.textContent = `(${itemCount} | Rs. ${totalPrice})`;

                showNotification(`${itemId} removed from cart`);
            }
        });
    });

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
