#BOOK INVENTORY SYSTEM (MERN STACK)

- /client → React + Vite + Tailwind Frontend + MUI
- /server → Node.js + Express + MongoDB Backend _JWT

Book Dashboard Application

A full-stack React + Node.js (Express + MongoDB) app to manage books with authentication, CRUD operations, search/filter, pagination, and notifications.

Features: 
Authentication: Login system with JWT token
Book Management: Add, Edit, Delete, View books
Search & Filter: Filter books by title, author name, category and stock based
Pagination: Navigate through large book lists
Notifications: Snackbar messages for actions
UI: Fixed table header with scrollable content, responsive design

Tech Stack:
Frontend: React + Vite, MUI (Material UI), tailwind Css, Axios
Backend: Node.js, Express, MongoDB, Mongoose
Authentication: JWT
State Management: React Hooks


Setup Instructions:
BOOK-INVENTORY/
├─ client/       # React frontend
├─ server/       # Node.js backend
├─ README.md  

--Backend--
cd server
npm install
npm run dev

--Frontend--
cd client
npm install
npm run dev or npm start


Application Flow
1. Login

User enters credentials → POST /api/login
Server validates → returns JWT token
Token saved in localStorage → user redirected to Dashboard

2. Dashboard

Fetch all books → GET /api/books
Display books in a table with fixed header and scrollable content
Search by title → filters table dynamically
Filter by category → filters table dynamically
Pagination → displays limited rows per page

3. Add Book

Click Add Book button → opens modal
Fill in book details → POST /api/book
Table updates with new book → Snackbar success notification

4. Edit Book

Click Edit icon → opens modal pre-filled with book data
Update fields → PUT /api/book/:id
Table updates with edited book → Snackbar success notification

5. Delete Book

Click Delete icon → DELETE /api/book/:id
Table updates removing the book →open confirmation dialogue -> Snackbar success notification

Additionally a header contains avatr profile with an logout option.
