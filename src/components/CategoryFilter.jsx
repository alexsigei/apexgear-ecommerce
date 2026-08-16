function CategoryFilter({ category, onCategoryChange }) {
  const categories = [
    "All",
    "Laptops",
    "Phones",
    "Gaming",
    "Audio",
    "Accessories",
  ];

  function handleChange(event) {
    onCategoryChange(event.target.value);
  }

  return (
    <div>
      <label htmlFor="category">Filter by category</label>

      <select
        id="category"
        value={category}
        onChange={handleChange}
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;