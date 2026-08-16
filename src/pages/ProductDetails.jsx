function ProductDetails({ product }) {
  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <main>
      <img
        src={product.image}
        alt={product.name}
      />

      <h1>{product.name}</h1>

      <p>{product.category}</p>

      <p>{product.description}</p>

      <p>KSh {product.price.toLocaleString()}</p>
    </main>
  );
}

export default ProductDetails;