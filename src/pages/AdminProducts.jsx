import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

function AdminProducts() {
  const { products, loading, error } = useContext(ProductContext);

  if (loading) {
    return <h1>Loading products...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Admin Products</h1>

      <p>Total products: {products.length}</p>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} — KSh {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminProducts;