const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// GET all books
router.get('/', bookController.getAllBooks);

// POST add new book
router.post('/', bookController.addBook);

// PUT update book
router.put('/:id', bookController.updateBook);

// DELETE book
router.delete('/:id', bookController.deleteBook);

module.exports = router;
