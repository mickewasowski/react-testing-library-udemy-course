// import { render, screen } from '@testing-library/react';
import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';
import { render as renderWithWrapper } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

test('displays image for each scoop option from the server', async () => {
    render(<Options optionType="scoops" />);

    // find images
    // the name option for images is the alt text
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    //confirm alt text of images
    const altText = scoopImages.map(element => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from the server', async () => {
    render(<Options optionType="toppings" />);

    const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
    expect(toppingImages).toHaveLength(6);

    const toppingAltText = toppingImages.map(topping => topping.alt);
    expect(toppingAltText).toEqual(['M&Ms topping', 'Hot fudge topping', 'Peanut butter cups topping', 'Gummi bears topping', 'Mochi topping', 'Cherries topping']);
})

test('scoops subtotal not to update for invalid scoop count', async () => {
    renderWithWrapper(<Options optionType="scoops" />);
    const user = userEvent.setup();

    const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    const scoopsTotal = await screen.findByText('Scoops total:', { exact: false });

    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, '-1');
    expect(vanillaScoop).toHaveClass('is-invalid');
    expect(scoopsTotal).toHaveTextContent('0.00');

    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, '1');
    expect(vanillaScoop).not.toHaveClass('is-invalid');
    expect(scoopsTotal).toHaveTextContent('2.00');

    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, '2.5');
    expect(vanillaScoop).toHaveClass('is-invalid');
    expect(scoopsTotal).toHaveTextContent('0.00');
});
