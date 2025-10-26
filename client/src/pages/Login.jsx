import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Lock, Email } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || password.length < 6) {
      setError("Please enter a valid email and password (min 6 chars)");
      return;
    }

    try {
      const response = await axios.post("https://book-inventory-5qa9.onrender.com/api//login", {
        email,
        password,
      });

      console.log("API response:", response.data);
      const { token } = response.data;

      // Save token in local storage
      localStorage.setItem("token", token);

      // Decode token to get user data
      const decodedUser = jwtDecode(token);
      console.log("Decoded User:", decodedUser);

      // Update parent state 
      if (onLogin) onLogin(decodedUser);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 " style={{
        backgroundImage: `url("/bg_img1.jpg")`,
      }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-98 text-center">
        <h2 className="text-xl font-semibold mb-4">Book Inventory System</h2>
        <p className="text-gray-500 mb-6">Sign in to your account</p>
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <TextField
          label="Email Address"
          placeholder="Enter your email"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: <Email className="text-gray-400 mr-2" />,
          }}
        />

        <TextField
          label="Password"
          placeholder="Enter your password"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: <Lock className="text-gray-400 mr-2" />,
          }}
        />

        <p className="text-gray-400 text-sm mt-2 cursor-pointer hover:underline ml-50">
          Forgot Password?
        </p>

        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
          SIGN IN
        </Button>
      </div>
    </div>
  );
};

export default Login;
