const Book = require('../models/book');

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }); 
    res.status(200).json({ statusCode: 200, data: books });
  } catch (error) {
    console.error('Error in getAllBooks:', error);
    res.status(500).json({ statusCode: 500, message: 'Internal server error' });
  }
};

// add new book to collection
const addBook = async (req, res) => {
    try {
      let books = req.body;
  
      // Check if single object, wrap in array
      if (!Array.isArray(books)) {
        books = [books];
      }
  
      // Validate required fields
      for (let b of books) {
        if (!b.title || !b.author || !b.price || !b.category) {
          return res.status(400).json({ statusCode: 400, message: 'Missing required fields in one of the books' });
        }
      }
  
      const savedBooks = await Book.insertMany(books);
      res.status(201).json({ statusCode: 201, data: savedBooks });
    } catch (error) {
      console.error('Error in addBook:', error);
      res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
  };
  
//  update a book in collection by passing the id
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook)
      return res.status(404).json({ statusCode: 404, message: 'Book not found' });

    res.status(200).json({ statusCode: 200, data: updatedBook });
  } catch (error) {
    console.error('Error in updateBook:', error);
    res.status(500).json({ statusCode: 500, message: 'Internal server error' });
  }
};

// delete a book from collection by passing the id
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook)
      return res.status(404).json({ statusCode: 404, message: 'Book not found' });

    res.status(200).json({ statusCode: 200, message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error in deleteBook:', error);
    res.status(500).json({ statusCode: 500, message: 'Internal server error' });
  }
};

module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
};