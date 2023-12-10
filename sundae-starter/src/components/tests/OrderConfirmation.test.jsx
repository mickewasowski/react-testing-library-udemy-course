import { render, screen } from '../../test-utils/testing-library-utils';
import { HttpResponse, http } from 'msw';
import { server } from '../../mocks/server';
import OrderConfirmation from '../OrderConfirmation';

test('server error on order confirmation page', async () => {
    server.resetHandlers(http.post('http://localhost:3030/order', () => {
        new HttpResponse(null, { status: 500 })
    }));

    render(<OrderConfirmation />);

    // const alert = await screen.findByText(/An unexpected error ocurred. Please try again later./i);
    // expect(alert).toBeInTheDocument();

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('An unexpected error ocurred. Please try again later.');
});