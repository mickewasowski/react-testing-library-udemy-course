import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

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
