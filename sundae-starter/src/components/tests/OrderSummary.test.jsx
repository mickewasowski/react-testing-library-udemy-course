import { render, screen, fireEvent } from '@testing-library/react'
import SummaryForm from '../SummaryForm';

test("checkbox enables button flow", () => {
    render(<SummaryForm />);
    //checkbox is unchecked by default (initial state)
    const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i});
    const submitButton = screen.getByRole("button", { name: /order/i });
    expect(checkbox).not.toBeChecked();
    expect(submitButton).toBeDisabled();


    //checkbox enables the submit order button
    fireEvent.click(checkbox);
    expect(submitButton).toBeEnabled();
    expect(checkbox).toBeChecked();

    //unchecking the checkbox again disables the submit order button
    fireEvent.click(checkbox);
    expect(submitButton).toBeDisabled();
    expect(checkbox).not.toBeChecked();
});