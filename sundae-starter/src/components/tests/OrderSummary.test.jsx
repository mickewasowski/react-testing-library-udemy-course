import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test("checkbox enables button flow", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);
    //checkbox is unchecked by default (initial state)
    const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i});
    const submitButton = screen.getByRole("button", { name: /order/i });
    expect(checkbox).not.toBeChecked();
    expect(submitButton).toBeDisabled();


    //checkbox enables the submit order button
    await user.click(checkbox);
    expect(submitButton).toBeEnabled();
    expect(checkbox).toBeChecked();

    //unchecking the checkbox again disables the submit order button
    await user.click(checkbox);
    expect(submitButton).toBeDisabled();
    expect(checkbox).not.toBeChecked();
});

test("popover response to hover", async () => {
    const user = userEvent.setup();
    render(<SummaryForm/>);

    // popover should be hidden by default
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    //popover should appear when we hover/mouseover over the checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    //popover should disappear when we mouseout
    await user.unhover(popover);
    expect(popover).not.toBeInTheDocument();
});