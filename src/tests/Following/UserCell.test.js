import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UserCell from './UserCell';
import unfollow from '../../apis/unfollow';
import follow from '../../apis/follow';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
jest.mock('../../apis/unfollow');
jest.mock('../../apis/follow');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('UserCell Component', () => {
    const mockUser = {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        avatar: 'avatar.jpg',
        bio: 'Test bio',
        followsMe: false,
        followedByMe: false,
        token: 'token',
        myID: 2,
    };

    beforeEach(() => {
        unfollow.mockClear();
        follow.mockClear();
    });

    it('should render UserCell component', () => {
        const { getByText } = render(
            <Router>
                <UserCell {...mockUser} />
            </Router>
        );
        expect(getByText('John Doe')).toBeInTheDocument();
        expect(getByText('@johndoe')).toBeInTheDocument();
        expect(getByText('Test bio')).toBeInTheDocument();
    });

    it('should call unfollow when follow button is clicked and followedByMe is true', async () => {
        const { getByText } = render(
            <Router>
                <UserCell {...mockUser} followedByMe={true} />
            </Router>
        );
        const button = getByText('Following');
        fireEvent.click(button);
        expect(unfollow).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(button).toHaveTextContent('Following'));
    });

    it('should call follow when unfollow button is clicked and followedByMe is false', async () => {
        const { getByText } = render(
            <Router>
                <UserCell {...mockUser} />
            </Router>
        );
        const button = getByText('Follow');
        fireEvent.click(button);
        expect(follow).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(button).toHaveTextContent('Follow'));
    });

    it('should navigate to user profile when clicked', async () => {
        const mockNavigate = jest.fn();
        const { container, getByText } = render(
            <Router>
                <UserCell {...mockUser} navigate={mockNavigate} />
            </Router>
        );
        await waitFor(() => {
            const usernameElement = getByText('@johndoe');
            fireEvent.click(usernameElement);
        });

        expect(mockNavigate).not.toHaveBeenCalledWith('/profile/johndoe', {
            state: { userID: 1 },
        });
    });

    it('should change button text when mouse enters and leaves', () => {
        const { getByText } = render(
            <Router>
                <UserCell {...mockUser} />
            </Router>
        );
        const button = getByText('Follow');
        fireEvent.mouseEnter(button);
        expect(button).toHaveTextContent('Follow');
        fireEvent.mouseLeave(button);
        expect(button).toHaveTextContent('Follow');
    });
});
