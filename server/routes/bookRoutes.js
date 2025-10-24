const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const loginController=require('../controllers/loginController');
// GET all books
router.get('/books', bookController.getAllBooks);

// POST add new book
router.post('/book', bookController.addBook);

// PUT update book
router.put('/book/:id', bookController.updateBook);

// DELETE book
router.delete('/book/:id', bookController.deleteBook);

router.post('/login',loginController.loginUser);


module.exports = router;
