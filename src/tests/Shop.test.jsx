import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Shop from "../pages/Shop";

vi.mock("../hooks/useProductContext", () => ({
  default: () => ({
    products: [
      {
        id: "1",
        name: "MacBook Air M3",
        category: "Laptops",
        price: 145000,
        description: "A powerful laptop",
        image: "image1.jpg",
      },
      {
        id: "2",
        name: "iPhone 15",
        category: "Phones",
        price: 95000,
        description: "A modern smartphone",
        image: "image2.jpg",
      },
      {
        id: "3",
        name: "Logitech G502",
        category: "Gaming",
        price: 8500,
        description: "A gaming mouse",
        image: "image3.jpg",
      },
    ],
    loading: false,
    error: null,
  }),
}));

describe("Shop", () => {
  test("displays products", () => {
    render(
  <MemoryRouter>
    <Shop />
  </MemoryRouter>
);

    expect(screen.getByText("MacBook Air M3")).toBeInTheDocument();
    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
    expect(screen.getByText("Logitech G502")).toBeInTheDocument();
  });

  test("filters products when searching", () => {
    render(
  <MemoryRouter>
    <Shop />
  </MemoryRouter>
);

    const searchInput = screen.getByPlaceholderText(
      "Search products..."
    );

    fireEvent.change(searchInput, {
      target: { value: "phone" },
    });

    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
    expect(screen.queryByText("MacBook Air M3")).not.toBeInTheDocument();
    expect(screen.queryByText("Logitech G502")).not.toBeInTheDocument();
  });

  test("filters products by category", () => {
    render(
  <MemoryRouter>
    <Shop />
  </MemoryRouter>
);

    const categorySelect = screen.getByLabelText(
      "Filter by category"
    );

    fireEvent.change(categorySelect, {
      target: { value: "Gaming" },
    });

    expect(screen.getByText("Logitech G502")).toBeInTheDocument();
    expect(screen.queryByText("MacBook Air M3")).not.toBeInTheDocument();
    expect(screen.queryByText("iPhone 15")).not.toBeInTheDocument();
  });
});