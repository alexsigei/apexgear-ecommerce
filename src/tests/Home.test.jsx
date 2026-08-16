import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import ProductProvider from "../context/ProductContext";

describe("Home", () => {
  test("displays the hero heading", () => {
    render(
      <MemoryRouter>
        <ProductProvider>
          <Home />
        </ProductProvider>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Gear up for/i)
    ).toBeInTheDocument();
  });
});