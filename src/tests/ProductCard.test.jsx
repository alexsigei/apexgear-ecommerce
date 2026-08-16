import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";

test("displays product information", () => {
  const product = {
    id: "1",
    name: "MacBook Air M3",
    category: "Laptops",
    price: 145000,
    image: "https://example.com/macbook.jpg",
    description: "A powerful and lightweight laptop.",
  };

  render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", {
      name: "MacBook Air M3",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText("Laptops")
  ).toBeInTheDocument();

  expect(
    screen.getByText("A powerful and lightweight laptop.")
  ).toBeInTheDocument();

  expect(
    screen.getByText("KSh 145,000")
  ).toBeInTheDocument();
});

test("has a link to the product details page", () => {
  const product = {
    id: "1",
    name: "MacBook Air M3",
    category: "Laptops",
    price: 145000,
    image: "https://example.com/macbook.jpg",
    description: "A powerful and lightweight laptop.",
  };

  render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  );

  const link = screen.getByRole("link", {
    name: "View Product",
  });

  expect(link).toHaveAttribute("href", "/shop/1");
});
