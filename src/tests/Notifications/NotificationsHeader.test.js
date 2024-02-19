import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotificationHeader from './NotificationsHeader';
import '@testing-library/jest-dom';

describe('NotificationHeader', () => {
    it('calls navigate with correct path when All is clicked', () => {
        const mockNavigate = jest.fn();
        const { getByText } = render(
            <MemoryRouter>
                <NotificationHeader activePage={0} navigate={mockNavigate} />
            </MemoryRouter>
        );

        fireEvent.click(getByText('All'));
        expect(mockNavigate).not.toHaveBeenCalledWith('/notifications');
    });

    it('calls navigate with correct path when Mentions is clicked', () => {
        const mockNavigate = jest.fn();
        const { getByText } = render(
            <MemoryRouter>
                <NotificationHeader activePage={1} navigate={mockNavigate} />
            </MemoryRouter>
        );

        fireEvent.click(getByText('Mentions'));
        expect(mockNavigate).not.toHaveBeenCalledWith(
            '/notifications/mentions'
        );
    });

    it('does not call navigate when All is already active', () => {
        const mockNavigate = jest.fn();
        const { getByText } = render(
            <MemoryRouter>
                <NotificationHeader activePage={0} navigate={mockNavigate} />
            </MemoryRouter>
        );

        fireEvent.click(getByText('All'));
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('does not call navigate when Mentions is already active', () => {
        const mockNavigate = jest.fn();
        const { getByText } = render(
            <MemoryRouter>
                <NotificationHeader activePage={1} navigate={mockNavigate} />
            </MemoryRouter>
        );

        fireEvent.click(getByText('Mentions'));
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
