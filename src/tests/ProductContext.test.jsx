import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import ProductProvider from "../context/ProductContext";
import useProductContext from "../hooks/useProductContext";

import { getProducts } from "../services/productService";

vi.mock("../services/productService", () => ({
  getProducts: vi.fn(),
  getProduct: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
}));

describe("ProductContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides product data and actions to consumers", async () => {
    const products = [
      {
        id: "1",
        name: "MacBook Air",
      },
    ];

    getProducts.mockResolvedValue(products);

    const wrapper = ({ children }) => (
      <ProductProvider>{children}</ProductProvider>
    );

    const { result } = renderHook(
      () => useProductContext(),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // State
    expect(result.current.products).toEqual(products);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);

    // Product operations
    expect(result.current.fetchProducts).toBeInstanceOf(Function);
    expect(result.current.fetchProduct).toBeInstanceOf(Function);
    expect(result.current.addProduct).toBeInstanceOf(Function);
    expect(result.current.editProduct).toBeInstanceOf(Function);
    expect(result.current.removeProduct).toBeInstanceOf(Function);
  });

  it("throws an error when used outside ProductProvider", () => {
    expect(() => {
        renderHook(() => useProductContext());
    }).toThrow(
        "useProductContext must be used inside ProductProvider"
    );
  });
});