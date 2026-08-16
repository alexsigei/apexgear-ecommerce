import { render, screen, fireEvent } from "@testing-library/react";
import CategoryFilter from "../components/CategoryFilter";

describe("CategoryFilter", () => {
  test("renders the category options", () => {
    render(
      <CategoryFilter
        category="All"
        onCategoryChange={() => {}}
      />
    );

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Laptops")).toBeInTheDocument();
    expect(screen.getByText("Phones")).toBeInTheDocument();
    expect(screen.getByText("Gaming")).toBeInTheDocument();
    expect(screen.getByText("Audio")).toBeInTheDocument();
    expect(screen.getByText("Accessories")).toBeInTheDocument();
  });

  test("calls onCategoryChange when a category is selected", () => {
    const handleCategoryChange = vi.fn();

    render(
      <CategoryFilter
        category="All"
        onCategoryChange={handleCategoryChange}
      />
    );

    const select = screen.getByLabelText("Filter by category");

    fireEvent.change(select, {
      target: { value: "Phones" },
    });

    expect(handleCategoryChange).toHaveBeenCalledWith("Phones");
  });
});