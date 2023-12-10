import { render, screen } from '@testing-library/react';
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';
import { HttpResponse, http } from 'msw'


test('handles errors for scoops and toppings routes', async () => {
    //overiding tge default handlers
    server.resetHandlers(
        http.get("http://localhost:3030/scoops", () => {
            return new HttpResponse(null, { status: 500 });
        }),
        http.get("http://localhost:3030/toppings", () => {
            return new HttpResponse(null, { status: 500 });
        }),
    );

    render(<OrderEntry />);

    //the below will not work because of how React Bootstrap renders the Alert.
    //even thought we provide a text to our component AlertBanner the name remains an empty string
    // const alerts = await screen.findAllByRole('alert', { name: 'An unexpected error ocurred. Please try again later.' });

    //const alerts = await screen.findAllByText('An unexpected error ocurred. Please try again later.');
    const alerts = await screen.findAllByRole('alert');

    expect(alerts).toHaveLength(2);
});
