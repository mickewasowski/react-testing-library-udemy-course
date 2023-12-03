// import { render, screen } from '@testing-library/react';
import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

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