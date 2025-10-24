import React from "react";
import { TextField, MenuItem } from "@mui/material";

const SearchFilterBar = ({ search, setSearch, category, setCategory,stock, setStock }) => {
  return (
    <div className="flex gap-4 items-center">
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-60"
      />

<TextField
  select
  variant="outlined"
  size="small"
  label="Category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-40"
>
  <MenuItem value="All">All</MenuItem>
  <MenuItem value="Frontend">Frontend</MenuItem>
  <MenuItem value="Backend">Backend</MenuItem>
  <MenuItem value="Programming">Programming</MenuItem>
  <MenuItem value="Database">Database</MenuItem>
  <MenuItem value="History">History</MenuItem>
  <MenuItem value="Fiction">Fiction</MenuItem>
  <MenuItem value="Fantasy">Fantasy</MenuItem>
  <MenuItem value="Poetry">Poetry</MenuItem>
  <MenuItem value="Self-Help">Self-Help</MenuItem>
  <MenuItem value="Cooking">Cooking</MenuItem>
  <MenuItem value="Education">Education</MenuItem>
  <MenuItem value="Mystery">Mystery</MenuItem>
</TextField>

        {/* Stock filter */}
        <TextField
        select
        variant="outlined"
        size="small"
        label="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-40"
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="In Stock">In Stock</MenuItem>
        <MenuItem value="Out of Stock">Out of Stock</MenuItem>
      </TextField>
    </div>
  );
};

export default SearchFilterBar;
