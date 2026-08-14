import { useCallback, useEffect, useState } from "react";
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

  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(null);

    return getProducts()
      .then((data) => {
        setProducts(data);
        return data;
      })
      .catch((error) => {
        setError(error.message);
        return null;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fetchProduct = useCallback((id) => {
    return getProduct(id)
      .catch((error) => {
        setError(error.message);
        return null;
      });
  }, []);

  const addProduct = useCallback((product) => {
    setError(null);

    return createProduct(product)
      .then((newProduct) => {
        setProducts((currentProducts) => [
          ...currentProducts,
          newProduct
        ]);

        return newProduct;
      })
      .catch((error) => {
        setError(error.message);
        return null;
      });
  }, []);

  const editProduct = useCallback((id, updatedProduct) => {
    setError(null);

    return updateProduct(id, updatedProduct)
      .then((updatedProductFromServer) => {
        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === id
              ? updatedProductFromServer
              : product
          )
        );

        return updatedProductFromServer;
      })
      .catch((error) => {
        setError(error.message);
        return null;
      });
  }, []);

  const removeProduct = useCallback((id) => {
    setError(null);

    return deleteProduct(id)
      .then(() => {
        setProducts((currentProducts) =>
          currentProducts.filter(
            (product) => product.id !== id
          )
        );

        return true;
      })
      .catch((error) => {
        setError(error.message);
        return false;
      });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    addProduct,
    editProduct,
    removeProduct
  };
}

export default useProducts;