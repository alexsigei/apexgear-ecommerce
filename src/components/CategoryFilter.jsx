function CategoryFilter({ category, setCategory, onCategoryChange }) {
  const categories = [
    "All",
    "Laptops",
    "Phones",
    "Gaming",
    "Audio",
    "Accessories",
  ];

  function handleChange(event) {
    const selectedCategory = event.target.value;

    // Used by Shop
    if (setCategory) {
      setCategory(selectedCategory);
    }

    // Used by the CategoryFilter test
    if (onCategoryChange) {
      onCategoryChange(selectedCategory);
    }
  }

  return (
    <div>
      <label htmlFor="category">
        Filter by category
      </label>

      <select
        id="category"
        value={category || "All"}
        onChange={handleChange}
      >
        {categories.map((categoryName) => (
          <option key={categoryName} value={categoryName}>
            {categoryName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;