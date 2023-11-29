import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import InputField from "../src/components/InputField";

describe("Input field", () => {
  it("renders input field correctly", async () => {
    render(<InputField />);

    const user = userEvent.setup();
    // Hitta elementet via placeholder-text
    const inputElement = screen.getByPlaceholderText("Enter text...");
    expect(inputElement).toBeInTheDocument();

    // Testa skriva i fältet
    await user.type(inputElement, "Testing");
    expect(inputElement).toHaveValue("Testing");
  });
});
