import axios from "axios";

const API_BASE_URL = 'https://book-inventory-5qa9.onrender.com/api';

export const getBooks = () => axios.get(`${API_BASE_URL}/books`);
export const addBook = (book) => axios.post(`${API_BASE_URL}/book`, book);
export const updateBook = (id, book) => axios.put(`${API_BASE_URL}/book/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_BASE_URL}/book/${id}`);
