import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-card-content">
        <p>{product.category}</p>

        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <p>KSh {product.price.toLocaleString()}</p>

        <Link to={`/shop/${product.id}`}>
          View Product
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
