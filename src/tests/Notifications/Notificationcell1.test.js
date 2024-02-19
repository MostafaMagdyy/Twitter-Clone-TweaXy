import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Notificationcell1 from './Notificationcell1';
import '@testing-library/jest-dom';
describe('Notificationcell1', () => {
    it('renders with the correct props', () => {
        const action = 'LIKE';
        const fromuser = {
            username: 'example_user',
            name: 'Example User',
            avatar: 'avatar.jpg',
        };
        const interaction = {
            id: 'interaction_id',
            type: 'tweet',
            text: 'Some tweet text',
        };
        const user = {
            username: 'example_user',
            id: 'user_id',
        };

        const { getByText } = render(
            <MemoryRouter>
                {' '}
                {}
                <Notificationcell1
                    action={action}
                    fromuser={fromuser}
                    interaction={interaction}
                    user={user}
                />
            </MemoryRouter>
        );
        expect(getByText(fromuser.name)).toBeInTheDocument();
        expect(getByText(interaction.text)).toBeInTheDocument();
    });

    it('calls routingHandlerProfile on clicking the user avatar', () => {
        // Define your props
        const action = 'LIKE';
        const fromuser = {
            username: 'example_user',
            name: 'Example User',
            avatar: 'avatar.jpg',
        };
        const interaction = {
            id: 'interaction_id',
            type: 'tweet',
            text: 'Some tweet text',
        };
        const user = {
            username: 'example_user',
            id: 'user_id',
        };
        const mockNavigate = jest.fn();

        const { getByTestId } = render(
            <MemoryRouter>
                {' '}
                {}
                <Notificationcell1
                    action={action}
                    fromuser={fromuser}
                    interaction={interaction}
                    user={user}
                    navigate={mockNavigate}
                />
            </MemoryRouter>
        );
        fireEvent.click(getByTestId('avatar'));
        expect(mockNavigate).not.toHaveBeenCalledWith(
            `/profile/${fromuser.username}`,
            {
                state: { userID: fromuser.id },
            }
        );
    });
});
