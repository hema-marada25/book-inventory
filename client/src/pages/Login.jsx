import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Lock, Email } from '@mui/icons-material';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Simple demo validation: min 6 chars password and email not empty
    if (!email || password.length < 6) {
      setError("Please enter a valid email and password (min 6 chars)");
      return;
    }

    // Call parent's onLogin to update authenticated state
    onLogin({ email });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-xl font-semibold mb-4">Book Inventory System</h2>
        <p className="text-gray-500 mb-6">Sign in to manage your collection</p>
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
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          SIGN IN
        </Button>
        <p className="text-gray-400 text-sm mt-4">
          Demo: Use any valid email and password (min 6 characters)
        </p>
      </div>
    </div>
  );
};

export default Login;
