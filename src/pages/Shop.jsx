import { useState } from "react";

import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import useProductContext from "../hooks/useProductContext";

function Shop() {
  const {
    products,
    loading,
    error,
  } = useProductContext();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    ...new Set(
      products.map((product) => product.category)
    ),
  ];

  const filteredProducts = products.filter((product) => {
    const productName = product.name?.toLowerCase() || "";
    const searchValue = search.toLowerCase();

    const matchesSearch =
      productName.includes(searchValue);

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <main className="shop-page-state">
        <div className="loading-orb" />
        <p>Loading ApexGear...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="shop-page-state">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="shop-page">

      {/* SHOP HEADER */}

      <section className="shop-header">

        <div>

          <p className="shop-eyebrow">
            APEXGEAR · COLLECTION
          </p>

          <h1>
            Find your
            <span>next upgrade.</span>
          </h1>

          <p className="shop-intro">
            Explore our collection of laptops, phones,
            gaming gear, audio equipment and more.
          </p>

        </div>

        <div className="shop-count">

          <strong>
            {filteredProducts.length}
          </strong>

          <span>
            {filteredProducts.length === 1
              ? "product"
              : "products"}
          </span>

        </div>

      </section>


      {/* FILTER BAR */}

      <section className="shop-controls">

        <SearchBar
          search={search}
          onSearch={setSearch}
        />

        <CategoryFilter
          category={category}
          setCategory={setCategory}
          onCategoryChange={setCategory}
          categories={categories}
        />

      </section>


      {/* PRODUCT GRID */}

      <ProductList
        products={filteredProducts}
      />

    </main>
  );
}

export default Shop;