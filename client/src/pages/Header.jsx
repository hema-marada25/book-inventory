import React from "react";
import { AppBar, Toolbar, Typography, Avatar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex justify-between">
        {/* Left: Menu or Logo */}
        <div className="flex items-center gap-2">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Book Dashboard
          </Typography>
        </div>

        {/* Right: Avatar */}
        <div>
          <Avatar alt="User" src="https://i.pravatar.cc/150?img=3" />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
