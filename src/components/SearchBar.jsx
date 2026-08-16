import { useState } from "react";

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  function handleChange(event) {
    const value = event.target.value;

    setSearch(value);
    onSearch(value);
  }

  return (
    <div>
      <label htmlFor="search">Search products</label>

      <input
        id="search"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;