import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BookTable from "../components/BookTable";
import BookModal from "../components/BookModal";
import SearchFilterBar from "../components/SearchFilterBar";
import Header from "./Header";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/books");
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

  // Add / Edit Book (Dynamic API)
  const handleAddBook = async (book) => {
    try {
      if (editingBook) {
        // UPDATE existing book
        const res = await axios.put(`http://localhost:5000/books/${editingBook._id}`, book);
        setBooks((prev) =>
          prev.map((b) => (b._id === editingBook._id ? res.data.data : b))
        );
      } else {
        // ADD new book
        const res = await axios.post("http://localhost:5000/books", book);
        setBooks((prev) => [...prev, res.data.data]);
      }
      setOpenModal(false);
      setEditingBook(null);
    } catch (err) {
      console.error("Error saving book:", err);
      alert("Failed to save book. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
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
      <div className="flex justify-between mb-4 items-center">
        <SearchFilterBar />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
        >
          Add Book
        </Button>
      </div>

      {/*Scroll only this section — header stays fixed */}
      <div className="max-h-[70vh] overflow-y-auto border rounded-lg">
        <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
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
