import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { kebabCaseToTitleCase } from "./helpers";

test("button click flow", () => {
  render(<App />);

});

test("checkbox flow", () => {
  // render app
  render(<App />);

});

test("checkbox flow after button click", () => {
  // render app
  render(<App />);

});

describe("kebabCaseToTitleCase", () => {
  test("Works for no hypens", () => {
    
  });
  test("Works for one hyphen", () => {
    
  });
  test("Works for multiple inner hyphens", () => {
    
  });
});
