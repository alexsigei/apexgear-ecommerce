import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import "../styles/admin-products.css";

function AdminProducts() {
  // products current list of producst from context
  const {
    products,
    removeProduct,
    loading,
    error,
  } = useContext(ProductContext);

  const navigate = useNavigate();
  console.log(products)
  

  //temp message for loading

  if (loading) {
    return (
      <main className="admin-products-page">
        <div className="admin-products-state">
          Loading products...
        </div>
      </main>
    );
  }

  // display erroe retuned by context
  if (error) {
    console.log(error)
    return (
      <main className="admin-products-page">
        <div className="admin-products-state admin-products-error">
          {error}
        </div>
      </main>
    );
  }

  
  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    await removeProduct(id);
  };

  return (
    <main className="admin-products-page">

      {/* HEADER */}

      <section className="admin-products-header">

        <div>
          <p className="admin-products-eyebrow">
            APEXGEAR · INVENTORY
          </p>

          <h1>
            Products
          </h1>

          <p className="admin-products-description">
            Add, edit, and manage everything in your
            product collection.
          </p>
        </div>


        <button
          className="admin-add-button"
          onClick={() =>
            navigate("/admin/products/add")
          }
        >
          <span>+</span>
          Add product
        </button>

      </section>


      {/* SUMMARY products lenght = products stored in ProductContext*/}

      <section className="admin-products-summary">

        <div>
          <span className="summary-label">
            TOTAL PRODUCTS
          </span>

          <strong>
            {products.length}
          </strong>
        </div>

        <div className="summary-divider" />

        <p>
          Your current ApexGear inventory
        </p>

      </section>


      {/* PRODUCT TABLE */}

      <section className="products-table-card">

        <div className="products-table-header">

          <div>
            <p className="table-eyebrow">
              INVENTORY
            </p>

            <h2>
              All products
            </h2>
          </div>

          <span className="product-count">
            {products.length} items
          </span>

        </div>


        <div className="products-table-wrapper">

          <table className="products-table">

            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>


            <tbody>
              {/*loop products */}
              

              {products.map((product) => {
                console.log(product)

                const stock = Number(product.stock);
                const price = Number(product.price);

                console.log(stock ,price)

                

                return (
                  <tr key={product.id}>

                    {/* Product */}

                    <td>
                      <div className="managed-product">

                        <div className="managed-product-image">

                          <img
                            src={product.image}
                            alt={product.name}
                          />

                        </div>

                        <div className="managed-product-name">

                          <strong>
                            {product.name}
                          </strong>

                          <span>
                            #{product.id}
                          </span>

                        </div>

                      </div>
                    </td>


                    {/* Category */}

                    <td>
                      <span className="managed-category">
                        {product.category}
                      </span>
                    </td>


                    {/* Price */}

                    <td>
                      <span className="managed-price">
                        KSh{" "}
                        {price.toLocaleString("en-KE")}
                      </span>
                    </td>


                    {/* Stock */}

                    <td>

                      <span
                        className={`managed-stock ${
                          stock > 0
                            ? "managed-stock-available"
                            : "managed-stock-empty"
                        }`}
                      >

                        <span className="managed-stock-dot" />

                        {stock > 0
                          ? stock
                          : "Out"}

                      </span>

                    </td>


                    {/* Description */}

                    <td>
                      <p className="managed-description">
                        {product.description ||
                          "No description available."}
                      </p>
                    </td>


                    {/* Actions */}

                    <td>

                      <div className="product-actions">
                        { /* edit product*/}

                        <button
                          type="button"
                          className="edit-product-button"
                          onClick={() =>
                            navigate(
                              `/admin/products/edit/${product.id}`
                            )
                          }
                        >
                          Edit
                        </button>

                        {/* delete product*/}

                        <button
                          type="button"
                          className="delete-product-button"
                          onClick={() =>
                            handleDelete(product.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

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

export default AdminProducts;