import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  const [user, setUser] = useState(null); // null = not logged in

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />           {/* Default: login */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* After login */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
