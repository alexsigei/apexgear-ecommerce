import useProductContext from "../hooks/useProductContext";

function Shop() {
  const {
    products,
    loading,
    error
  } = useProductContext();

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Unable to load products: {error}</p>;
  }

  return (
    <main>
      <h1>Shop ApexGear</h1>

      <p>
        {products.length} products available
      </p>
    </main>
  );
}

export default Shop;