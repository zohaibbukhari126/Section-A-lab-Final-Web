const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


const products = [
    {
        id: 101,
        title: "Krunch Chicken Combo",
        price: 570,
        imageUrl: "https://www.kfcpakistan.com/images/43a98620-ffaa-11ed-b6b3-6970cc1cd666-krunch-with-combo-2023-05-31115706.png",
        desc: "1 Krunch burger + 1 pc of Hot and Crispy Fried Chicken + 1 Regular drink",
        quantity: 0
    },
    {
        id: 102,
        title: "Chicken & Chips",
        price: 590,
        imageUrl: "https://www.kfcpakistan.com/images/43a9fb50-ffaa-11ed-8180-812e571998fe-chicken-n-chips-2023-05-31115706.png",
        desc: "2 pieces of Hot and Crispy Fried Chicken+ Fries + Dinner roll+ signature Vietnamese Sauce",
        quantity: 0
    },
    {
        id: 103,
        title: "Zinger Combo",
        price: 850,
        imageUrl: "https://www.kfcpakistan.com/images/43a98620-ffaa-11ed-b6b3-6970cc1cd666-zinger-combo-2023-05-31115706.png",
        desc: "Zinger burger + 1 Regular fries+ 1 Regular drink",
        quantity: 0
    },
    {
        id: 104,
        title: "Happy Meal Chicken Burger",
        price: 569,
        imageUrl: "https://mcdonalds.com.pk/wp-content/uploads/2022/08/Chicken-Burger-1.png",
        desc: "Grab one! A legendary combo of 100% pure chicken and ketchup, all in a soft burger bun to make you want to go and get one for yourself.",
        quantity: 0
    },
    {
        id: 105,
        title: "Crispy Box",
        price: 670,
        imageUrl: "https://www.kfcpakistan.com/images/43aa4970-ffaa-11ed-9c55-3705f003c528-CrispyBox-2023-05-31115706.png",
        desc: "In mood for something crispy? Get 2 pcs Hot & Crispy Chicken + 1 Regular fries + 1 Regular drink + 1 Coleslaw",
        quantity: 0
    },
];
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route to serve products data
app.get('/products', (req, res) => {
    res.json(products);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
