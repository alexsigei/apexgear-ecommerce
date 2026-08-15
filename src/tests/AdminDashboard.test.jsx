import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import ProductProvider from "../context/ProductContext";

import { getProducts } from "../services/productService";

vi.mock("../services/productService", () => ({
  getProducts: vi.fn(),
  getProduct: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn()
}));

describe("AdminDashboard", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

  it("displays product statistics", async () => {
    getProducts.mockResolvedValue([
      {
        id: "1",
        name: "MacBook Air",
        category: "Laptops",
        price: 145000,
        stock: 8
      },
      {
        id: "2",
        name: "iPhone 15",
        category: "Phones",
        price: 95000,
        stock: 12
      },
      {
        id: "3",
        name: "Old Headphones",
        category: "Audio",
        price: 5000,
        stock: 0
      }
    ]);

    render(
      <MemoryRouter>
        <ProductProvider>
          <AdminDashboard />
        </ProductProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("ApexGear Admin Dashboard")
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText("Total Products")
    ).toBeInTheDocument();

    expect(
      screen.getByText("3")
    ).toBeInTheDocument();

    expect(
      screen.getByText("2")
    ).toBeInTheDocument();

    expect(
      screen.getByText("MacBook Air")
    ).toBeInTheDocument();

    expect(
      screen.getByText("iPhone 15")
    ).toBeInTheDocument();
  });

  it("shows an error when loading products fails", async () => {
    getProducts.mockRejectedValue(
      new Error("Network error")
    );

    render(
      <MemoryRouter>
        <ProductProvider>
          <AdminDashboard />
        </ProductProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Error: Network error")
      ).toBeInTheDocument();
    });
  });
});