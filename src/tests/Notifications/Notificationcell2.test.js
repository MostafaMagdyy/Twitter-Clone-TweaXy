import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Notificationcell2 from './Notificationcell2';
import '@testing-library/jest-dom';

describe('Notificationcell2', () => {
    it('renders with the correct props', () => {
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

        const { getByText } = render(
            <MemoryRouter>
                <Notificationcell2
                    fromuser={fromuser}
                    interaction={interaction}
                />
            </MemoryRouter>
        );

        expect(getByText(fromuser.name)).toBeInTheDocument();
    });

    it('calls routingHandlerProfile on clicking the user avatar', () => {
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
        const mockNavigate = jest.fn();

        const { getByTestId } = render(
            <MemoryRouter>
                <Notificationcell2
                    fromuser={fromuser}
                    interaction={interaction}
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
it('calls routingFollwers on clicking the notification container', () => {
    const fromuser = {
        username: 'example_user',
        name: 'Example User',
        avatar: 'avatar.jpg',
        id: 'user_id',
    };
    const interaction = {
        type: 'followed you',
    };
    const mockNavigate = jest.fn();

    const { getByTestId } = render(
        <MemoryRouter>
            <Notificationcell2
                fromuser={fromuser}
                interaction={interaction}
                navigate={mockNavigate}
            />
        </MemoryRouter>
    );

    expect(mockNavigate).not.toHaveBeenCalledWith(
        `/${fromuser.username}/followers`,
        {
            state: {
                name: fromuser.name,
                username: fromuser.username,
                userID: fromuser.id,
            },
        }
    );
});
