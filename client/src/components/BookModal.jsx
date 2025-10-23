import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControlLabel, Checkbox } from "@mui/material";

const BookModal = ({ open, onClose, onSubmit, editingBook }) => {
  const [form, setForm] = useState({ title: "", author: "", price: "", category: "", inStock: true });

  useEffect(() => {
    if (editingBook) setForm(editingBook);
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.author || !form.price || !form.category) return alert("All fields are required!");
    onSubmit(form);
  };

  return (
    
    <Dialog open={open} onClose={onClose}  fullWidth        // allows the dialog to take full width up to maxWidth
    maxWidth="sm" >
      <DialogTitle>{editingBook ? "Edit Book" : "Add Book"}</DialogTitle>
      <DialogContent className="flex flex-col gap-4 mt-2">
        <TextField name="title" label="Title" value={form.title} onChange={handleChange} fullWidth required />
        <TextField name="author" label="Author" value={form.author} onChange={handleChange} fullWidth required />
        <TextField name="price" label="Price" value={form.price} onChange={handleChange} type="number" fullWidth required />
        <TextField name="category" label="Category" value={form.category} onChange={handleChange} fullWidth required />
        <FormControlLabel control={<Checkbox checked={form.inStock} onChange={handleChange} name="inStock" />} label="In Stock" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" className="bg-amber-700" onClick={handleSubmit}>
          {editingBook ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookModal;
