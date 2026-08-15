import { useCallback, useEffect, useState } from "react";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProducts();

      setProducts(data);

      return data;
    } catch (error) {
      setError(error.message);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProduct = useCallback(async (id) => {
    try {
      const product = await getProduct(id);

      return product;
    } catch (error) {
      setError(error.message);

      return null;
    }
  }, []);

  const addProduct = useCallback(async (product) => {
    setError(null);

    try {
      const newProduct = await createProduct(product);

      setProducts((currentProducts) => [
        ...currentProducts,
        newProduct,
      ]);

      return newProduct;
    } catch (error) {
      setError(error.message);

      return null;
    }
  }, []);

  const editProduct = useCallback(async (id, updatedProduct) => {
    setError(null);

    try {
      const updatedProductFromServer = await updateProduct(
        id,
        updatedProduct
      );

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === id
            ? updatedProductFromServer
            : product
        )
      );

      return updatedProductFromServer;
    } catch (error) {
      setError(error.message);

      return null;
    }
  }, []);

  const removeProduct = useCallback(async (id) => {
    setError(null);

    try {
      await deleteProduct(id);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== id
        )
      );

      return true;
    } catch (error) {
      setError(error.message);

      return false;
    }
  }, []);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    addProduct,
    editProduct,
    removeProduct,
  };
}

export default useProducts;