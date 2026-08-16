import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  test("renders the search input", () => {
    render(<SearchBar onSearch={() => {}} />);

    expect(
      screen.getByPlaceholderText("Search products...")
    ).toBeInTheDocument();
  });

  test("calls onSearch when the user types", () => {
    const handleSearch = vi.fn();

    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText("Search products...");

    fireEvent.change(input, {
      target: { value: "phone" },
    });

    expect(handleSearch).toHaveBeenCalledWith("phone");
  });
});