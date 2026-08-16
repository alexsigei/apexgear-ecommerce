import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductDetails from "../pages/ProductDetails";

const product = {
  id: 1,
  name: "MacBook Air M3",
  category: "Laptops",
  description: "A powerful laptop",
  price: 145000,
  image: "image1.jpg",
};

describe("ProductDetails", () => {
  test("displays product information", () => {
    render(
      <MemoryRouter>
        <ProductDetails product={product} />
      </MemoryRouter>
    );

    expect(screen.getByText("MacBook Air M3")).toBeInTheDocument();
    expect(screen.getByText("Laptops")).toBeInTheDocument();
    expect(screen.getByText("A powerful laptop")).toBeInTheDocument();
    expect(screen.getByText("KSh 145,000")).toBeInTheDocument();
  });
});