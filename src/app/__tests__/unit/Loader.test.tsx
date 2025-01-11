import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Loader from "../../components/ProductsScanner/Loader";

describe("Loader", () => {
  it("renders three bouncing circles with correct classes", () => {
    // Render komponentu
    render(<Loader />);

    // Wyszukiwanie kontenera po data-testid
    const container = screen.getByTestId("loader-container");
    expect(container).toBeInTheDocument();

    // Sprawdzenie liczby elementów z animacją
    const bouncingCircles = container.querySelectorAll(".animate-bounce");
    expect(bouncingCircles).toHaveLength(3);

    // Sprawdzenie klas i kolorów
    expect(bouncingCircles[0]).toHaveClass("bg-[#26BDDC]");
    expect(bouncingCircles[1]).toHaveClass("bg-[#FB8500]");
    expect(bouncingCircles[2]).toHaveClass("bg-[#009E52]");
  });
});
