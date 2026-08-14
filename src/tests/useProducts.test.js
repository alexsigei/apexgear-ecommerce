import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import useProducts from "../hooks/useProducts";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../services/productService";

vi.mock("../services/productService", () => ({
  getProducts: vi.fn(),
  getProduct: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn()
}));

describe("useProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches products when the hook loads", async () => {
    const products = [
      { id: "1", name: "MacBook Air" },
      { id: "2", name: "iPhone 15" }
    ];

    getProducts.mockResolvedValue(products);

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(products);
    expect(result.current.error).toBe(null);
  });

  it("handles fetch errors", async () => {
    getProducts.mockRejectedValue(
      new Error("Failed to fetch products")
    );

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      "Failed to fetch products"
    );
  });

  it("adds a product", async () => {
    const existingProduct = {
      id: "1",
      name: "MacBook Air"
    };

    const newProduct = {
      id: "2",
      name: "Keyboard"
    };

    getProducts.mockResolvedValue([existingProduct]);
    createProduct.mockResolvedValue(newProduct);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(1);
    });

    await act(async () => {
      await result.current.addProduct({
        name: "Keyboard"
      });
    });

    expect(result.current.products).toEqual([
      existingProduct,
      newProduct
    ]);
  });

  it("edits a product", async () => {
    const existingProduct = {
      id: "1",
      name: "MacBook Air",
      price: 140000
    };

    const updatedProduct = {
      id: "1",
      name: "MacBook Air M3",
      price: 145000
    };

    getProducts.mockResolvedValue([existingProduct]);
    updateProduct.mockResolvedValue(updatedProduct);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(1);
    });

    await act(async () => {
      await result.current.editProduct("1", updatedProduct);
    });

    expect(result.current.products).toEqual([
      updatedProduct
    ]);
  });

  it("removes a product", async () => {
    const products = [
      { id: "1", name: "MacBook Air" },
      { id: "2", name: "iPhone 15" }
    ];

    getProducts.mockResolvedValue(products);
    deleteProduct.mockResolvedValue(true);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(2);
    });

    await act(async () => {
      await result.current.removeProduct("1");
    });

    expect(result.current.products).toEqual([
      { id: "2", name: "iPhone 15" }
    ]);
  });

  it("handles an error when adding a product", async () => {
    getProducts.mockResolvedValue([]);

    createProduct.mockRejectedValue(
        new Error("Failed to create product")
    );

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
        expect(result.current.loading).toBe(false);
    });

    await act(async () => {
        await result.current.addProduct({
        name: "Keyboard"
        });
    });

    expect(result.current.error).toBe(
        "Failed to create product"
    );

    expect(result.current.products).toEqual([]);
  });

  it("handles an error when updating a product", async () => {
    const product = {
        id: "1",
        name: "MacBook Air"
    };

    getProducts.mockResolvedValue([product]);

    updateProduct.mockRejectedValue(
        new Error("Failed to update product")
    );

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
        expect(result.current.products).toHaveLength(1);
    });

    await act(async () => {
        await result.current.editProduct("1", {
        name: "Updated MacBook"
        });
    });

    expect(result.current.error).toBe(
        "Failed to update product"
    );

    expect(result.current.products).toEqual([product]);
  });

  it("handles an error when deleting a product", async () => {
    const product = {
        id: "1",
        name: "MacBook Air"
    };

    getProducts.mockResolvedValue([product]);

    deleteProduct.mockRejectedValue(
        new Error("Failed to delete product")
    );

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
        expect(result.current.products).toHaveLength(1);
    });

    await act(async () => {
        await result.current.removeProduct("1");
    });

    expect(result.current.error).toBe(
        "Failed to delete product"
    );

    expect(result.current.products).toEqual([product]);
  });
});