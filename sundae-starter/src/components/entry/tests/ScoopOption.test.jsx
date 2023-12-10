import ScoopOption from '../ScoopOption';
import { render as renderWithWrapper, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

test('scoop spinbutton to become red on invalid value', async () => {
    renderWithWrapper(<ScoopOption name='Vanilla' imagePath={'http://localhost:3030/vanilla'}/>);
    const user = userEvent.setup();

    const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, '1');
    expect(vanillaScoop).not.toHaveClass('is-invalid');

    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, '-1');
    expect(vanillaScoop).toHaveClass('is-invalid');

    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, '3');
    expect(vanillaScoop).not.toHaveClass('is-invalid');
});
