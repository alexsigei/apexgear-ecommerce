import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductList from "../components/ProductList";

describe("ProductList", () => {
  test("renders multiple products", () => {
    const products = [
      {
        id: "1",
        name: "MacBook Air M3",
        category: "Laptops",
        price: 145000,
        image: "image1.jpg",
        description: "A powerful laptop",
      },
      {
        id: "2",
        name: "iPhone 15",
        category: "Phones",
        price: 95000,
        image: "image2.jpg",
        description: "A modern smartphone",
      },
    ];

    render(
      <MemoryRouter>
        <ProductList products={products} />
      </MemoryRouter>
    );

    expect(screen.getByText("MacBook Air M3")).toBeInTheDocument();
    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
  });
});
