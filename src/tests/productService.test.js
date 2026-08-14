import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../services/productService";

describe("productService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("gets all products", () => {
    const products = [
      { id: "1", name: "MacBook Air" }
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(products)
    });

    return getProducts().then((data) => {
      expect(data).toEqual(products);
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/products"
      );
    });
  });

  it("gets a single product", () => {
    const product = {
      id: "1",
      name: "MacBook Air"
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(product)
    });

    return getProduct("1").then((data) => {
      expect(data).toEqual(product);
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/products/1"
      );
    });
  });

  it("creates a product", () => {
    const product = {
      name: "Keyboard",
      price: 5000
    };

    const createdProduct = {
      id: "5",
      ...product
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(createdProduct)
    });

    return createProduct(product).then((data) => {
      expect(data).toEqual(createdProduct);

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/products",
        expect.objectContaining({
          method: "POST"
        })
      );
    });
  });

  it("updates a product", () => {
    const updatedProduct = {
      id: "1",
      name: "Updated MacBook",
      price: 150000
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(updatedProduct)
    });

    return updateProduct("1", updatedProduct).then((data) => {
      expect(data).toEqual(updatedProduct);

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/products/1",
        expect.objectContaining({
          method: "PATCH"
        })
      );
    });
  });

  it("deletes a product", () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({})
    });

    return deleteProduct("1").then((data) => {
      expect(data).toBe(true);

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/products/1",
        expect.objectContaining({
          method: "DELETE"
        })
      );
    });
  });
});