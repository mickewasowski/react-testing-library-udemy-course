import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { kebabCaseToTitleCase } from './utils';

test("button starts with the correct text and color", () => {
  //render App
  render(<App />);

  //find button
  const btnElement = screen.getByRole("button", { name: /blue/i });

  //check initial color of the button
  expect(btnElement).toHaveClass("red");

  //click the button
  fireEvent.click(btnElement);

  //check the button text
  expect(btnElement).toHaveTextContent(/change to red/i)

  //check the button color
  expect(btnElement).toHaveClass("blue");
  expect(btnElement).toHaveStyle({ "background-color": "rgb(0, 0, 255)" });
});

test("checkbox flow", () => {
  render(<App />);

  const button = screen.getByRole("button", { name: /blue/i });
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i });

  expect(button).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});

test("checkbox flow with clicking", () => {
  render(<App />);

  const button = screen.getByRole("button", { name: /blue/i });
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i });

  fireEvent.click(checkbox);

  expect(button).toBeDisabled();
  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox);

  expect(button).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});

test("button turns grey when checkbox is ticked", () => {
  render(<App/>);

  const button = screen.getByRole("button", { name: /blue/i });
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i });

  fireEvent.click(checkbox);

  expect(button).toBeDisabled();
  expect(button).toHaveStyle({ "background-color": "rgb(128, 128, 128)" });

  fireEvent.click(checkbox);

  expect(button).toBeEnabled();
  expect(button).toHaveStyle({ "background-color": "rgb(255, 0, 0)" });

  fireEvent.click(button);

  expect(button).toHaveStyle({ "background-color": "rgb(0, 0, 255)" });

  fireEvent.click(checkbox);

  expect(button).toHaveStyle({ "background-color": "rgb(128, 128, 128)" });
});

describe("kebabCaseToTitleCase", () => {
  test("works for no hyphens", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red");
  });

  test("works for one hyphen", () => {
    expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
  });

  test("works for multiple hyphens", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
});
