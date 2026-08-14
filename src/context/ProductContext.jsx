import { createContext } from "react";
import useProducts from "../hooks/useProducts";

export const ProductContext = createContext(null);

function ProductProvider({ children }) {
  const productData = useProducts();

  return (
    <ProductContext.Provider value={productData}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;