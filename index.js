const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const InventoryItem = require('./models/InventoryItem');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Inventory Management API');
});


const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

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

app.post('/api/inventory', async (req,res)=>{
    const {name, description, quantity, price}=req.body;
    try {
        const newItems=new InventoryItem({name, description, quantity, price});
        await newItems.save();
        res.json(newItems);
    } catch (error) {
        res.status(500).json({message: error.message}) // Corrected error response
    }
})

app.get('/api/inventory', async(req,res)=>{
    try {
        const getItems= await InventoryItem.find();
        res.json(getItems);
    } catch (error) {
        res.status(500).json({message: error.message}) // Corrected error response
    }
})

// PUT Route
app.put('/api/inventory/:id', async (req, res) => {
    const { name, description, quantity, price } = req.body;
    try {
        const updatedItem = await InventoryItem.findByIdAndUpdate(
            req.params.id,
            { name, description, quantity, price },
            { new: true } // Return the updated document
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE Route
app.delete('/api/inventory/:id', async (req, res) => {
    try {
        const deletedItem = await InventoryItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});