import { useNavigate } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import useProductContext from "../hooks/useProductContext";
import "../styles/admin.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const {
    products,
    loading,
    error,
  } = useProductContext();

  if (loading) {
    return (
      <main className="admin-page">
        <div className="admin-state">
          Loading dashboard...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="admin-page">
        <div className="admin-state admin-error">
          Error: {error}
        </div>
      </main>
    );
  }

  const totalProducts = products.length;

  const inStock = products.filter(
    (product) => Number(product.stock) > 0
  ).length;

  const outOfStock = products.filter(
    (product) => Number(product.stock) === 0
  ).length;

  return (
    <main className="admin-page">

      {/* =========================================
          HEADER
      ========================================== */}

      <section className="admin-header">

        <div>
          <p className="admin-eyebrow">
            APEXGEAR · ADMIN
          </p>

          <h1>
            Dashboard
          </h1>

          <p className="admin-description">
            Keep an eye on your inventory and manage
            your product collection.
          </p>
        </div>

        <button
          className="admin-primary-button"
          onClick={() => navigate("/admin/products")}
        >
          Manage products
          <span>→</span>
        </button>

      </section>


      {/* =========================================
          STATS
      ========================================== */}

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


      {/* =========================================
          PRODUCT OVERVIEW
      ========================================== */}

      <section className="admin-products-section">

        <div className="admin-section-header">

          <div>
            <p className="admin-section-label">
              INVENTORY
            </p>

            <h2>
              Product overview
            </h2>
          </div>

          <button
            className="admin-secondary-button"
            onClick={() => navigate("/admin/products")}
          >
            View all
            <span>→</span>
          </button>

        </div>


        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => {

                const stock = Number(product.stock);
                const price = Number(product.price);

                return (
                  <tr key={product.id}>

                    <td>
                      <div className="admin-product-name">
                        <div className="admin-product-image">
                          <img
                            src={product.image}
                            alt=""
                          />
                        </div>

                        <span>
                          {product.name}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="admin-category">
                        {product.category}
                      </span>
                    </td>

                    <td>
                      KSh {price.toLocaleString("en-KE")}
                    </td>

                    <td>

                      <span
                        className={`stock-status ${
                          stock > 0
                            ? "stock-available"
                            : "stock-empty"
                        }`}
                      >
                        <span className="status-dot" />

                        {stock > 0
                          ? `${stock} available`
                          : "Out of stock"}
                      </span>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}

export default AdminDashboard;