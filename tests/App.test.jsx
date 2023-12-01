import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { expect } from "vitest";
import App from "../src/App";

// HITTA HEADERN
test("Renders header text", () => {
  const { getByText } = render(<App />);
  // Hitta header-texten
  const headerTextElement = getByText("My dictionary");
  expect(headerTextElement).toBeInTheDocument();
});

describe("Dictionary content", () => {
  // HITTA AUDIOSPELARE
  test("Renders audio player when MP3 source is available", async () => {
    render(<App />);
    // Hitta inputfält och knapp
    const searchField = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button");
    const user = userEvent.setup();
    // Sök på "Happy"
    await user.type(searchField, "Happy");
    await user.click(searchButton);
    // Vänta på att audio-spelare ska renderas
    await waitFor(() => {
      const audioElements = screen.getAllByRole("audio");
      audioElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    });
  });

  // HÄMTA DATA NÄR MAN SÖKT PÅ ETT ORD
  test("fetches data when the button is clicked", async () => {
    render(<App />);
    // Hitta inputfält och knapp
    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button");
    const user = userEvent.setup();
    // Sök på "Happy"
    await user.type(inputElement, "Happy");
    await user.click(buttonElement);
    // Vänta på att order ska renderas i ordlistan
    await waitFor(() => {
      const wordElement = screen.getByRole("heading");
      expect(wordElement).toBeInTheDocument();
    });
  });
});

describe("Inputfield", () => {
  //HITTA ETT INPUTFÄLT
  test("Renders input field correctly", async () => {
    render(<App />);
    // Hitta elementet via placeholder-text
    const inputElement = screen.getByPlaceholderText("Enter word...");
    expect(inputElement).toBeInTheDocument();
    const user = userEvent.setup();
    // Testa skriva "Testing" i fältet
    await user.type(inputElement, "happy");
    // Vänta på att Inputfältet ska innehålla "happy"
    await waitFor(() => {
      expect(inputElement).toHaveValue("happy");
    });
  });

  test("fetches data when the Enter key is pressed", async () => {
    render(<App />);
    // Hitta knapp och inputfält
    const inputElement = screen.getByRole("textbox");
    const user = userEvent.setup();
    // Skriv in "Happy" i inputfältet
    await user.type(inputElement, "Happy");
    // Sök via enter-tangent
    await user.type(inputElement, "{enter}");
    // Vänta på att order ska renderas
    await waitFor(() => {
      const wordElement = screen.getByRole("heading");
      expect(wordElement).toBeInTheDocument();
    });
  });

  //ERROR NÄR MAN SÖKER PÅ TOMT FÄLT
  test("Should display error message after empty submission via click", async () => {
    render(<App />);
    const user = userEvent.setup();
    // Hitta knappen
    const searchButton = screen.getByRole("button");
    // Klicka på knappen
    await user.click(searchButton);
    // Error-meddelande visas
    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });

  //ERROR NÄR MAN SÖKER PÅ ORD SOM INTE FINNS
  test("Should display not found message after wrong submission via click", async () => {
    render(<App />);
    // Hitta inputfält och knapp
    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button");
    const user = userEvent.setup();
    // Sök på ord som inte finns
    await user.type(inputElement, "ghsghsgdh");
    await user.click(buttonElement);
    //  No results found-meddelande visas
    await waitFor(() =>
      expect(screen.getByText("No results found")).toBeInTheDocument()
    );
  });
});
