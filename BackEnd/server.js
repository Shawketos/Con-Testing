const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const MongoConnect = require('../BackEnd/DB/MongoConnect'); // Import MongoConnect Singleton
const Product = require('../BackEnd/Models/Product');
const userRoutes = require('../BackEnd/Routes/User'); // Import User routes
const ProductRoutes = require('../BackEnd/Routes/Product');
const CartRoutes = require('../BackEnd/Routes/orders');
const NoticationRoutes = require('../BackEnd/Routes/Notification');
require('dotenv').config();

const seedProducts = [
    {
        name: 'Nebula Wireless Headphones',
        description: 'Immersive spatial audio with adaptive noise control.',
        price: 249.99,
        stock: 35,
    },
    {
        name: 'Aurora Smart Lamp',
        description: 'Gradient RGB lighting with voice and motion automation.',
        price: 129.0,
        stock: 60,
    },
    {
        name: 'Lumen Home Hub',
        description: 'Privacy-first smart home controller with edge AI.',
        price: 199.0,
        stock: 42,
    },
    {
        name: 'Pulse Fitness Band',
        description: 'Carbon fiber wearable with biofeedback sensors.',
        price: 179.0,
        stock: 75,
    },
    {
        name: 'Orbit Drone Mini',
        description: '4K stabilized camera drone that fits in your palm.',
        price: 299.0,
        stock: 20,
    },
    {
        name: 'Flux Portable Projector',
        description: 'Laser projection with HDR10 and ultra-short throw.',
        price: 449.0,
        stock: 18,
    },
];

const ensureSeedProducts = async () => {
    const count = await Product.countDocuments();
    if (count === 0) {
        await Product.insertMany(seedProducts);
        console.log('Seeded default products for onboarding.');
    }
};

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xssClean());

console.log('JWT_SECRET:', process.env.JWT_SECRET);

app.get('/', (req, res) => {
    res.send('test');
});

// Define your MongoDB connection URL and server port
const URL = process.env.MONGO_URL || 'mongodb://localhost:27017/E-Shop'; // Use MONGO_URL from .env or default to local URL
const PORT = process.env.PORT || 3400;

// Add routes
app.use('/user', userRoutes);
app.use('/product', ProductRoutes);
app.use('/cart', CartRoutes);
app.use('/notifications', NoticationRoutes);

// Start function using MongoConnect Singleton
const start = async () => {
    try {
        const dbInstance = MongoConnect.getInstance(); // Get the singleton instance
        await dbInstance.connect(URL); // Connect to MongoDB using the Singleton
        await ensureSeedProducts();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to the database or starting the server:', error);
    }
};

start();
