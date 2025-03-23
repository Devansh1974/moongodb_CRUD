// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const inventoryRoutes = require('./routes/inventoryRoutes');

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Inventory Management API');
});

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    });

app.use('/api/inventory', inventoryRoutes);