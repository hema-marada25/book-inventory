import React, { useState, useEffect } from "react";
import { Button, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import BookTable from "../components/BookTable";
import BookModal from "../components/BookModal";
import SearchFilterBar from "../components/SearchFilterBar";
import Header from "./Header";
import { getBooks, addBook, updateBook, deleteBook } from "../bookService";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stock, setStock] = useState("All");


const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");
const [snackbarSeverity, setSnackbarSeverity] = useState("success");

const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [bookToDelete, setBookToDelete] = useState(null);

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBooks();
        setBooks(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()); // added author
  
    const matchesCategory = category === "All" || book.category === category;
      const matchesStock =
      stock === "All" ||
      (stock === "In Stock" && book.inStock) ||
      (stock === "Out of Stock" && !book.inStock);
  
    return matchesSearch && matchesCategory && matchesStock;
  });
  

 
// Add / Edit Book
const handleAddBook = async (book) => {
    try {
      if (editingBook) {
        // Show info snackbar
        setSnackbarMessage("Updating book...");
        setSnackbarSeverity("info");
        setSnackbarOpen(true);
  
        // Update book
        await updateBook(editingBook._id, book);
        setSnackbarMessage("Book updated successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        // Show info snackbar
        setSnackbarMessage("Adding book...");
        setSnackbarSeverity("info");
        setSnackbarOpen(true);
  
        // Add book
        await addBook(book);
        setSnackbarMessage("Book added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
  
      // Close modal
      setOpenModal(false);
      setEditingBook(null);
  
      // Refetch all books from backend to stay in sync
      const res = await getBooks();
      setBooks(res.data.data);
  
    } catch (err) {
      console.error("Error saving book:", err);
      setSnackbarMessage("Failed to save book. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  
  

const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setDeleteDialogOpen(true);
  };
  

  
  const handleConfirmDelete = async () => {
    const bookId = bookToDelete._id || bookToDelete; // if it's already a string, fallback
    try {
      await deleteBook(bookId);
      const res = await getBooks();
      setBooks(res.data.data);
      setSnackbarMessage("Book deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Error deleting book:", err);
      setSnackbarMessage("Failed to delete book!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
      setBookToDelete(null);
    }
  };
  
  

  const handleEdit = (book) => {
    setEditingBook(book);
    setOpenModal(true);
  };

  if (loading) return <div className="p-6 text-center">Loading books...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-6">
        <div className="flex justify-between mb-4 items-center bg-white">
       
          <SearchFilterBar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            stock={stock}
            setStock={setStock}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
          >
            Add Book
          </Button>
        </div>
        <Dialog
  open={deleteDialogOpen}
  onClose={() => setDeleteDialogOpen(false)}
>
  <DialogTitle className="font-bold">Confirm Delete</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to delete the book <b className="text-red-500">{bookToDelete?.title}</b> ?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
    <Button onClick={handleConfirmDelete} color="error">Yes, Delete</Button>
  </DialogActions>
</Dialog>

<Snackbar
  open={snackbarOpen}
  autoHideDuration={3000}
  onClose={() => setSnackbarOpen(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    onClose={() => setSnackbarOpen(false)}
    severity={snackbarSeverity}
    sx={{ width: "100%" }}
  >
    {snackbarMessage}
  </Alert>
</Snackbar>


<div className="max-h-[77vh] rounded-lg p-2">
  {books.length === 0 ? (
    // No data at all
    <div className="text-center text-gray-500 py-10 italic font-medium">
      No data found.
    </div>
  ) : filteredBooks.length === 0 ? (
    // Data exists but none match filters
    <div className="text-center text-gray-500 py-10 italic font-medium">
      No matched records found.
    </div>
  ) : (
    // Display table normally
    <BookTable books={filteredBooks} onEdit={handleEdit} onDelete={handleDeleteClick} />
  )}
</div>

        <BookModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleAddBook}
          editingBook={editingBook}
        />
      </div>
    </div>
  );
};

export default Dashboard;
