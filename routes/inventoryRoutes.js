// routes/inventoryRoutes.js
const express = require('express');
const InventoryItem = require('../models/InventoryItem');

const router = express.Router();

router.post('/', (req, res) => {
    const { name, description, quantity, price } = req.body;
    if (!name || !description || !quantity || !price) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const newItems = new InventoryItem({ name, description, quantity, price });
    newItems.save()
        .then(savedItem => res.json(savedItem))
        .catch(error => res.status(500).json({ message: error.message }));
});

router.get('/', (req, res) => {
    InventoryItem.find()
        .then(getItems => res.json(getItems))
        .catch(error => res.status(500).json({ message: error.message }));
});

router.put('/:id', (req, res) => {
    const { name, description, quantity, price } = req.body;
    if (!name || !description || !quantity || !price) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    InventoryItem.findByIdAndUpdate(
        req.params.id,
        { name, description, quantity, price },
        { new: true }
    )
        .then(updatedItem => {
            if (!updatedItem) {
                return res.status(404).json({ message: 'Inventory item not found' });
            }
            res.json(updatedItem);
        })
        .catch(error => res.status(500).json({ message: error.message }));
});

router.delete('/:id', (req, res) => {
    InventoryItem.findByIdAndDelete(req.params.id)
        .then(deletedItem => {
            if (!deletedItem) {
                return res.status(404).json({ message: 'Inventory item not found' });
            }
            res.json({ message: 'Inventory item deleted successfully' });
        })
        .catch(error => res.status(500).json({ message: error.message }));
});

module.exports = router;

// ------------------------- Short code without try and catch --------------------------------

// const express = require('express');
// const InventoryItem = require('../models/InventoryItem');
// const router = express.Router();

// router.post('/', (req, res) => {
//     const { name, description, quantity, price } = req.body;
//     const newItems = new InventoryItem({ name, description, quantity, price });
//     newItems.save()
//         .then(savedItem => res.json(savedItem))
//         .catch(err => res.status(500).json({message: err.message}));
// });

// router.get('/', (req, res) => {
//     InventoryItem.find()
//         .then(getItems => res.json(getItems))
//         .catch(err => res.status(500).json({message: err.message}));
// });

// router.put('/:id', (req, res) => {
//     const { name, description, quantity, price } = req.body;
//     InventoryItem.findByIdAndUpdate(
//         req.params.id,
//         { name, description, quantity, price },
//         { new: true }
//     )
//         .then(updatedItem => res.json(updatedItem))
//         .catch(err => res.status(500).json({message: err.message}));
// });

// router.delete('/:id', (req, res) => {
//     InventoryItem.findByIdAndDelete(req.params.id)
//         .then(() => res.json({ message: 'Inventory item deleted successfully' }))
//         .catch(err => res.status(500).json({message: err.message}));
// });

// module.exports = router;