// import { render, screen } from '@testing-library/react';
import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
    const user = userEvent.setup();
    render(<Options optionType='scoops' />); // { wrapper: OrderDetailsProvider } -> individually provides the wrapper of our component in order to acquire needed functionality

    //make sure the scoop subtotal starts out 0.00$
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    //each scoop is 2$
    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

    //before we start changing the value of the input we'd want to clear the input
    //this is because we don't know if the user will put the cursor before or after the 0
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // update chocolate scoops to 2
    const chocolateScoops = await screen.findByRole('spinbutton', { name: 'Chocolate' });

    await user.clear(chocolateScoops);
    await user.type(chocolateScoops, '2');
    expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotal when topping is checked', async () => {
    const user = userEvent.setup();
    render(<Options optionType='toppings' />);

    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    await user.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    const mochiCheckbox = await screen.findByRole('checkbox', { name: 'Mochi' });
    await user.click(mochiCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('3.00');

    await user.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
    test('grand total starts at $0.00', () => {
        render(<OrderEntry />);

        const grandTotal = screen.getByText('Grand total: $', { exact: false });
        expect(grandTotal).toHaveTextContent('0.00');
    });

    test('grand total updates properly if scoop is added first', async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);

        const grandTotal = screen.getByText('Grand total: $', { exact: false });

        const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
        await user.clear(chocolateInput);
        await user.type(chocolateInput, '1');
        expect(grandTotal).toHaveTextContent('2.00');

        const hotFundgeTopping = await screen.findByRole('checkbox', { name: 'Hot fudge' });
        await user.click(hotFundgeTopping);
        expect(grandTotal).toHaveTextContent('3.50');
    });

    test('grand total updates properly if topping is added first', async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);

        const grandTotal = screen.getByText('Grand total: $', { exact: false });

        const gummiBearsTopping = await screen.findByRole('checkbox', { name: 'Gummi bears' });
        await user.click(gummiBearsTopping);
        expect(grandTotal).toHaveTextContent('1.50');

        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '1');
        expect(grandTotal).toHaveTextContent('3.50');
    });

    test('grand total updates properly if an item is removed', async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);

        const grandTotal = screen.getByText('Grand total: $', { exact: false });

        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '1');
        expect(grandTotal).toHaveTextContent('2.00');

        const mochiTopping = await screen.findByRole('checkbox', { name: 'Mochi' });
        await user.click(mochiTopping);
        expect(grandTotal).toHaveTextContent('3.50');

        const cherriesTopping = await screen.findByRole('checkbox', { name: 'Cherries' });
        await user.click(cherriesTopping);
        expect(grandTotal).toHaveTextContent('5.00');

        await user.click(mochiTopping);
        expect(grandTotal).toHaveTextContent('3.50');

        await user.type(vanillaInput, '0');
        expect(grandTotal).toHaveTextContent('1.50');
    });
});