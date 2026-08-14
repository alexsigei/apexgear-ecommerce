import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import ProductProvider from "../context/ProductContext";
import useProductContext from "../hooks/useProductContext";

import { getProducts } from "../services/productService";

vi.mock("../services/productService", () => ({
  getProducts: vi.fn(),
  getProduct: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn()
}));

describe("ProductContext", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

  it("provides product data to consumers", async () => {
    const products = [
      {
        id: "1",
        name: "MacBook Air"
      }
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

    expect(result.current.products).toEqual(products);
  });
});