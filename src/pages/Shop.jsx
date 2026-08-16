import { useState } from "react";

import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import useProductContext from "../hooks/useProductContext";

function Shop() {
  const { products, loading, error } = useProductContext();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      <h1>Shop ApexGear</h1>

      <p>
        {filteredProducts.length} products available
      </p>

      <SearchBar
        search={search}
        onSearch={setSearch}
      />

      <CategoryFilter
  categories={[
    ...new Set(
      products.map((product) => product.category)
    ),
  ]}
  onCategoryChange={setCategory}
/>

      <ProductList products={filteredProducts} />
    </main>
  );
}

export default Shop;