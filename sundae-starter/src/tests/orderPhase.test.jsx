import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';


test('order phases for happy path', async () => {
    //render the App
    const { unmount } = render(<App />);
    const user = userEvent.setup();

    //add ice cream scoops and toppings
    const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, '1');

    const mochiTopping = await screen.findByRole('checkbox', { name: 'Mochi' });
    await user.click(mochiTopping);

    //find and click order button
    const orderButton = await screen.findByRole('button', { name: 'Order Sundae!' });
    await user.click(orderButton);

    //check summary information based on order
    const scoopsSubtotal = await screen.findByText('Scoops: $', { exact: false });
    expect(scoopsSubtotal).toHaveTextContent('2.00');

    const toppingsSubtotal = await screen.findByText('Toppings: $', { exact: false });
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
    expect(screen.getByText('Mochi')).toBeInTheDocument();

    //accept terms and conditions and click button to confirm order
    const termsCheckbox = await screen.findByRole('checkbox', { name: /terms and conditions/i });
    await user.click(termsCheckbox);

    const confirmOrder = await screen.findByRole('button', { name: 'Confirm order' });
    expect(confirmOrder).toBeEnabled();

    await user.click(confirmOrder);

    //check if loading spinner is present
    const spinner = screen.getByText(/Loading.../i);
    expect(spinner).toBeInTheDocument();

    //confirm order number on confirmation page
    const orderNumber = await screen.findByRole('heading', { name: /Your order number is/i });
    expect(orderNumber).toHaveTextContent('123456');

    //click "new order" button on confirmation page
    const newOrderButton = await screen.findByRole('button', { name: /Create new order/i });
    await user.click(newOrderButton);

    //check that scoops and toppings subtotals have been reset
    const scoopsTotal = await screen.findByText('Scoops total:', { exact: false });
    expect(scoopsTotal).toHaveTextContent('0.00');

    const toppingsTotal = await screen.findByText('Toppings total:', { exact: false });
    expect(toppingsTotal).toHaveTextContent('0.00');

    unmount();
});

test('order summary should not have toppings if no toppings have been ordered', async () => {
    render(<App />);
    const user = userEvent.setup();

    const chocolate = await screen.findByRole('spinbutton', { name: 'Chocolate' });
    await user.clear(chocolate);
    await user.type(chocolate, '1');

    const orderButton = await screen.findByRole('button', { name: /order sundae/i });
    await user.click(orderButton);

    const scoops = screen.getByRole('heading', { name: 'Scoops: $2.00' });
    expect(scoops).toBeInTheDocument();

    const toppings = screen.queryByRole('heading', { name: /toppings/i }); //query is used when you expect something not to be there, it will return null
    expect(toppings).not.toBeInTheDocument();
});

test('no toppings should be present in the order summary menu if some were added and then removed', async () => {
    render(<App />);
    const user = userEvent.setup();

    const chocolate = await screen.findByRole('spinbutton', { name: 'Chocolate' });
    await user.clear(chocolate);
    await user.type(chocolate, '1');

    const mochi = await screen.findByRole('checkbox', { name: 'Mochi' });
    await user.click(mochi);
    expect(mochi).toBeChecked();
    const toppingsTotal = screen.getByText('Toppings total: ', { exact: false });
    expect(toppingsTotal).toHaveTextContent('1.50');

    await user.click(mochi);
    expect(mochi).not.toBeChecked();
    expect(toppingsTotal).toHaveTextContent('0.00');

    const orderButton = await screen.findByRole('button', { name: /order sundae/i });
    await user.click(orderButton);

    const scoops = await screen.findByRole('heading', { name: /scoops/i });
    expect(scoops).toHaveTextContent('2.00');

    const toppings = screen.queryByRole('heading', { name: /toppings/i });
    expect(toppings).not.toBeInTheDocument();
});