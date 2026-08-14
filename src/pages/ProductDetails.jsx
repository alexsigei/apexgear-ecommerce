import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProductContext from "../hooks/useProductContext";

function ProductDetails() {
  const { id } = useParams();

  const { fetchProduct } = useProductContext();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchProduct(id)
      .then((data) => {
        if (!data) {
          setError("Product not found.");
          return;
        }

        setProduct(data);
      })
      .catch(() => {
        setError("Unable to load product.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, fetchProduct]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>
        KSh {product.price.toLocaleString()}
      </p>
    </main>
  );
}

export default ProductDetails;