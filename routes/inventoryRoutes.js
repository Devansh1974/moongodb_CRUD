const express = require('express');
const InventoryItem = require('../models/InventoryItem');

const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.quantity || !req.body.price) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    new InventoryItem(req.body).save()
        .then(item => res.json(item))
        .catch(err => res.status(500).json({ message: err.message }));
});

router.get('/', (req, res) => {
    InventoryItem.find()
        .then(getItems => res.json(getItems))
        .catch(error => res.status(500).json({ message: error.message }));
});

router.put('/:id', (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.quantity || !req.body.price) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(item => item ? res.json(item) : res.status(404).json({ message: 'Item not found' }))
        .catch(err => res.status(500).json({ message: err.message }));
});

router.delete('/:id', (req, res) => {
    InventoryItem.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Inventory item deleted' }))
        .catch(err => res.status(404).json({ message: 'Inventory item not found' }));
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