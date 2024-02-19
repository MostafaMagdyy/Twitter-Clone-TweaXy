import { render, screen, fireEvent } from '@testing-library/react';
import EditProfileWindowHeader from './EditProfileWindowHeader';
import React from 'react';
import '@testing-library/jest-dom';
describe('EditProfileWindowHeader', () => {
    it('renders properly with close and save buttons', () => {
        const onCloseMock = jest.fn();
        const saveHandlerMock = jest.fn();

        render(
            <EditProfileWindowHeader onClose={onCloseMock} saveHandler={saveHandlerMock} />
        );

        const closeButton = screen.getByRole('button', { name: /×/i }); // Look for the close button by its text
        const saveButton = screen.getByRole('button', { name: /save/i });

        expect(closeButton).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
    });

    it('calls onClose function when close button is clicked', () => {
        const onCloseMock = jest.fn();
        const saveHandlerMock = jest.fn();

        render(
            <EditProfileWindowHeader onClose={onCloseMock} saveHandler={saveHandlerMock} />
        );

        const closeButton = screen.getByRole('button', { name: /×/i });
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalled();
    });

    it('calls saveHandler function when save button is clicked', () => {
        const onCloseMock = jest.fn();
        const saveHandlerMock = jest.fn();

        render(
            <EditProfileWindowHeader onClose={onCloseMock} saveHandler={saveHandlerMock} />
        );

        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);

        expect(saveHandlerMock).toHaveBeenCalled();
    });
});
