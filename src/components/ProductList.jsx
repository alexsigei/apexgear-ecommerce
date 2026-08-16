import ProductCard from "./ProductCard";

function ProductList({ products }) {
  if (!products.length) {
    return (
      <div className="shop-empty-state">

        <div className="shop-empty-icon">
          ×
        </div>

        <h2>
          No products found
        </h2>

        <p>
          Try changing your search or category filter.
        </p>

      </div>
    );
  }

  return (
    <section className="product-list">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}

    </section>
  );
}

export default ProductList;