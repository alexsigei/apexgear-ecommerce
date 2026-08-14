import { useEffect, useState } from "react";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../services/productService";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchProducts() {
    setLoading(true);

    getProducts()
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function addProduct(product) {
    return createProduct(product)
      .then((newProduct) => {
        setProducts((prevProducts) => [
          ...prevProducts,
          newProduct
        ]);

        return newProduct;
      });
  }

  function editProduct(id, updatedProduct) {
    return updateProduct(id, updatedProduct)
      .then((updated) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? updated : product
          )
        );

        return updated;
      });
  }

  function removeProduct(id) {
    return deleteProduct(id)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      });
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProduct,
    addProduct,
    editProduct,
    removeProduct
  };
}

export default useProducts;