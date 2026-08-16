import { useState } from "react";
import useProductContext from "../hooks/useProductContext";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

function Shop() {
  const {
    products,
    loading,
    error,
  } = useProductContext();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Unable to load products: {error}</p>;
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      <h1>Shop ApexGear</h1>

      <p>
        {filteredProducts.length} products available
      </p>

      <SearchBar onSearch={setSearch} />

      <CategoryFilter
        category={category}
        onCategoryChange={setCategory}
      />

      <ProductList products={filteredProducts} />
    </main>
  );
}

export default Shop;