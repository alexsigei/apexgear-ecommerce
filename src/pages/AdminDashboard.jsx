import { Link } from "react-router";
import StatsCard from "../components/StatsCard";
import useProductContext from "../hooks/useProductContext";

function AdminDashboard() {
  const {
    products,
    loading,
    error
  } = useProductContext();

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const totalProducts = products.length;

  const inStock = products.filter(
    (product) => product.stock > 0
  ).length;

  const outOfStock = products.filter(
    (product) => product.stock === 0
  ).length;

  return (
    <main>
      <h1>ApexGear Admin Dashboard</h1>

      <section className="stats-container">
        <StatsCard
          title="Total Products"
          value={totalProducts}
        />

        <StatsCard
          title="In Stock"
          value={inStock}
        />

        <StatsCard
          title="Out of Stock"
          value={outOfStock}
        />
      </section>

      <section>
        <div>
          <h2>Product Overview</h2>

          <Link to="/admin/products">
            Manage Products
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>
                  KSh {product.price.toLocaleString()}
                </td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default AdminDashboard;