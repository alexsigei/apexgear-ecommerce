import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProductContext from "../hooks/useProductContext";

function ProductDetails() {
  const { id } = useParams();

  const {
    fetchProduct,
    loading,
    error,
  } = useProductContext();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const result = await fetchProduct(id);

      if (result) {
        setProduct(result);
      }
    };

    loadProduct();
  }, [id, fetchProduct]);

  if (loading && !product) {
    return (
      <main className="product-details-state">
        <div className="loading-orb" />
        <p>Loading product...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="product-details-state">
        <h2>Unable to load product</h2>
        <p>{error}</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-details-state">
        <h2>Product not found.</h2>

        <Link to="/shop" className="details-back-link">
          ← Back to shop
        </Link>
      </main>
    );
  }

  const price = Number(product.price) || 0;
  const stock = Number(product.stock) || 0;

  return (
    <main className="product-details-page">

      <Link
        to="/shop"
        className="details-back-link"
      >
        ← Back to shop
      </Link>


      <section className="product-details-card">

        {/* IMAGE */}

        <div className="details-image">

          <img
            src={product.image}
            alt={product.name}
          />

          <span>
            {product.category}
          </span>

        </div>


        {/* INFORMATION */}

        <div className="details-information">

          <p className="details-eyebrow">
            {product.category}
          </p>

          <h1>
            {product.name}
          </h1>

          <p className="details-description">
            {product.description}
          </p>


          <div className="details-price">
            KSh {price.toLocaleString("en-KE")}
          </div>


          <div className="details-stock">

            <span
              className={
                stock > 0
                  ? "stock-dot available"
                  : "stock-dot unavailable"
              }
            />

            {stock > 0
              ? `${stock} available`
              : "Currently out of stock"}

          </div>


          <div className="details-actions">

            <button
              className="details-buy-button"
              disabled={stock === 0}
            >
              {stock > 0
                ? "Add to cart"
                : "Out of stock"}

              {stock > 0 && <span>→</span>}
            </button>

          </div>


          <div className="details-meta">

            <div>
              <span>Category</span>
              <strong>{product.category}</strong>
            </div>

            <div>
              <span>Availability</span>
              <strong>
                {stock > 0 ? "In stock" : "Unavailable"}
              </strong>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default ProductDetails;