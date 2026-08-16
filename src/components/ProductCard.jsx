import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const price = Number(product.price) || 0;

  return (
    <article className="product-card">

      <Link
        to={`/shop/${product.id}`}
        className="product-card-image"
      >
        <img
          src={product.image}
          alt={product.name}
        />

        <span className="product-card-category">
          {product.category}
        </span>
      </Link>


      <div className="product-card-content">

        <div className="product-card-heading">

          <h2>
            {product.name}
          </h2>

          <span className="product-stock">
            {Number(product.stock) > 0
              ? "In stock"
              : "Out of stock"}
          </span>

        </div>


        <p className="product-card-description">
          {product.description}
        </p>


        <div className="product-card-bottom">

          <strong>
            KSh {price.toLocaleString("en-KE")}
          </strong>

          <Link
            to={`/shop/${product.id}`}
            className="product-card-link"
          >
            View
            <span>→</span>
          </Link>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;