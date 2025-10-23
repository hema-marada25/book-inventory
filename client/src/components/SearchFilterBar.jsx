import React from "react";
import { TextField, MenuItem } from "@mui/material";

const SearchFilterBar = () => {
  return (
    <div className="flex gap-4 items-center">
      <TextField variant="outlined" size="small" placeholder="Search by title..." />
      <TextField select variant="outlined" size="small " label="Category" defaultValue="All" className="w-40" >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Classic">Programming</MenuItem>
        <MenuItem value="Romance">Design System</MenuItem>
        <MenuItem value="Science Fiction">Science Fiction</MenuItem>
        <MenuItem value="Fantasy">Fantasy</MenuItem>
      </TextField>
    </div>
  );
};

export default SearchFilterBar;
