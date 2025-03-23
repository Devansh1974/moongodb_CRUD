// routes/inventoryRoutes.js
const express = require('express');
const InventoryItem = require('../models/InventoryItem');
const TagSchema = require('../models/TagSchema');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, description, quantity, price } = req.body;
    if (!name || !description || !quantity || !price) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const newItems = new InventoryItem({ name, description, quantity, price });
        await newItems.save();
        res.json(newItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const getItems = await InventoryItem.find();
        res.json(getItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { name, description, quantity, price } = req.body;
    if (!name || !description || !quantity || !price) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const updatedItem = await InventoryItem.findByIdAndUpdate(
            req.params.id,
            { name, description, quantity, price },
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
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

module.exports = router;