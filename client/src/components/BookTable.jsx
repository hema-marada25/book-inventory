import React from "react";
import { IconButton, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BookTable = ({ books, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Author</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">In Stock</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-t-gray-600 hover:bg-gray-50">
              <td className="py-2 px-4">{book.title}</td>
              <td className="py-2 px-4">{book.author}</td>
              <td className="py-2 px-4">Rs.{book.price.toFixed(2)}</td>
              <td className="py-2 px-4">
                <Chip label={book.category} size="small" />
              </td>
              <td className="py-2 px-4">
                <Chip
                  label={book.inStock ? "In Stock" : "Out of Stock"}
                  color={book.inStock ? "success" : "default"}
                  size="small"
                />
              </td>
              <td className="py-2 px-4 flex justify-center space-x-2">
                <IconButton onClick={() => onEdit(book)} color="primary" size="small">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(book.id)} color="error" size="small">
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
