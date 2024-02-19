import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import React from 'react';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('ProfileHeader', () => {
    it('navigates back when the arrow back button is clicked', () => {
        const navigateMock = jest.fn();
        require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

        render(
            <BrowserRouter>
                <ProfileHeader username="JohnDoe" noPosts={10} />
            </BrowserRouter>
        );

        const arrowBackButton = screen.getByTestId('back-to-profile');
        fireEvent.click(arrowBackButton);

        expect(navigateMock).toHaveBeenCalledWith(-1);
    });
});
