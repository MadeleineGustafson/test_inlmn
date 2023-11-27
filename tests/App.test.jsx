import { render } from "@testing-library/react";
import React from "react";
import App from "../src/App";

it("renders header text", () => {
  const { getByText } = render(<App />);
  const headerTextElement = getByText("Dictionary");
  expect(headerTextElement).toBeInTheDocument();
});
