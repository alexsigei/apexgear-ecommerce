function SearchBar({ search, onSearch }) {
  function handleChange(event) {
    onSearch(event.target.value);
  }

  return (
    <div className="shop-search">

      <span className="shop-search-icon">
        ⌕
      </span>

      <input
        id="search"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={handleChange}
        aria-label="Search products"
      />

      {search && (
        <button
          type="button"
          className="shop-search-clear"
          onClick={() => onSearch("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}

    </div>
  );
}

export default SearchBar;