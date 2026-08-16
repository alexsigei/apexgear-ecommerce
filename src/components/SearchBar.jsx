function SearchBar({ search, onSearch }) {
  function handleChange(event) {
    onSearch(event.target.value);
  }

  return (
    <div>
      <label htmlFor="search">
        Search products:
      </label>

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