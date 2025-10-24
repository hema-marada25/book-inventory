import React, { useState } from "react";
import { TablePagination, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BookTable = ({ books, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedBooks = books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="bg-white shadow-md rounded-2xl">
      <div className="h-[550px]  ">
        <table className="w-full border-collapse">
          <thead className="bg-gray-300 text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 w-1/6 text-start">Title</th>
              <th className="py-3 px-4 w-1/6 text-start">Author</th>
              <th className="py-3 px-4 w-1/6 text-start">Price</th>
              <th className="py-3 px-4 w-1/6 text-start">Category</th>
              <th className="py-3 px-4 w-1/6 text-start">In Stock</th>
              <th className="py-3 px-4 text-center w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBooks.map((book) => (
              <tr key={book._id} className="border-y-neutral-500 hover:bg-gray-50">
                <td className="py-2 px-4">{book.title}</td>
                <td className="py-2 px-4">{book.author}</td>
                <td className="py-2 px-4">Rs.{book.price?.toFixed(2) ?? "0.00"}</td>
                <td className="py-2 px-4">
                  <Chip label={book.category} size="small" />
                </td>
                <td className="py-2 px-4">
                  <Chip label={book.inStock ? "In Stock" : "Out of Stock"} color={book.inStock ? "success" : "default"} size="small" />
                </td>
                <td className="py-2 px-4 flex justify-center space-x-2">
                  <IconButton onClick={() => onEdit(book)} color="primary" size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(book)} color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={books.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 20, 50]}
      />
    </div>
  );
};

export default BookTable;
