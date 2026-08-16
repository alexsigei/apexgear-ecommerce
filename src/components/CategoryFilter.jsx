function CategoryFilter({ category, setCategory, onCategoryChange, categories }) {
  const defaultCategories = [
    "All",
    "Laptops",
    "Phones",
    "Gaming",
    "Audio",
    "Accessories",
  ];

  const availableCategories =
    categories && categories.length > 0
      ? ["All", ...categories.filter((item) => item !== "All")]
      : defaultCategories;

  function handleChange(event) {
    const selectedCategory = event.target.value;

    if (setCategory) {
      setCategory(selectedCategory);
    }

    if (onCategoryChange) {
      onCategoryChange(selectedCategory);
    }
  }

  return (
    <div className="shop-filter-field">
      <label htmlFor="category">
        Category
      </label>

      <select
        id="category"
        value={category || "All"}
        onChange={handleChange}
      >
        {availableCategories.map((categoryName) => (
          <option key={categoryName} value={categoryName}>
            {categoryName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;