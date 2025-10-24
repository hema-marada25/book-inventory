import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); // open menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // close menu
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove auth token
    handleMenuClose();
    navigate("/"); // navigate to login page
  };

  return (
    <AppBar position="static" color="info" className="bg-black">
      <Toolbar className="flex justify-between">
        {/* Left: Menu or Logo */}
        <div className="flex items-center gap-2">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Book Inventory Dashboard
          </Typography>
        </div>

        {/* Right: Clickable Avatar with Menu */}
        <div>
          <IconButton onClick={handleAvatarClick}>
            <Avatar
              sx={{
                bgcolor: "white",
                color: "blue",
                width: 44,
                height: 44,
                fontSize: 20,
                border: "2px solid #000",
              }}
            >
              A
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
