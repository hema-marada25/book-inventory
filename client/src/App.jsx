import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [user, setUser] = useState(null); // null = not logged in

  return (
    <>
      {!user ? (
        <Login onLogin={setUser} /> // Show login page initially
      ) : (
        <Dashboard user={user} /> // Show dashboard after login
      )}
    </>
  );
};

export default App;
