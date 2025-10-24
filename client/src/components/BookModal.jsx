import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const BookModal = ({ open, onClose, onSubmit, editingBook }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    inStock: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBook) {
      setForm(editingBook);
      setErrors({});
    } else {
      setForm({ title: "", author: "", price: "", category: "", inStock: true });
      setErrors({});
    }
  }, [editingBook, open]);

  // Field change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });

    // Clear field error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.author.trim()) newErrors.author = "Author is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "Enter a valid price";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if valid
  };

  // Submit handler
  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingBook ? "Edit Book" : "Add Book"}</DialogTitle>

      <DialogContent className="flex flex-col gap-4 mt-2">
        <TextField
          name="title"
          label="Title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.title}
          helperText={errors.title}
        />

        <TextField
          name="author"
          label="Author"
          value={form.author}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.author}
          helperText={errors.author}
        />

        <TextField
          name="price"
          label="Price"
          value={form.price}
          onChange={handleChange}
          type="number"
          fullWidth
          required
          error={!!errors.price}
          helperText={errors.price}
        />

        <TextField
          name="category"
          label="Category"
          value={form.category}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.category}
          helperText={errors.category}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={form.inStock}
              onChange={handleChange}
              name="inStock"
            />
          }
          label="In Stock"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          className="bg-amber-700"
          onClick={handleSubmit}
        >
          {editingBook ? "Update Book" : "Add Book"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookModal;
