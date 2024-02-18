import SignUpPage5 from './SignUpPage5';
import { fireEvent, waitFor, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Errors } from './SignUpPage';
it('should render a password input field with a label and a toggle button to show/hide the password', () => {
    const password = 'testPassword';
    const passwordhandler = jest.fn();
    const nextWindowHandler = jest.fn();
    render(
        <SignUpPage5
            canbeuser={true}
            password={password}
            passwordhandler={passwordhandler}
            nextWindowHandler={nextWindowHandler}
        />
    );
    // Assert that the password input field is rendered with a label
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    // Assert that the toggle button to show/hide the password is rendered
    expect(
        screen.getByRole('button', { name: 'toggle password visibility' })
    ).toBeInTheDocument();
});
it('displays the password schema error message if the password is not acceptable after typing', async () => {
    const passwordhandler = jest.fn(); // Mock password handler function
    const nextWindowHandler = jest.fn(); // Mock next window handler function
    render(
        <SignUpPage5
            canbeuser={true}
            password="weak123"
            passwordhandler={passwordhandler}
            nextWindowHandler={nextWindowHandler}
        />
    );

    await waitFor(() => {
        expect(screen.getByText(Errors['Password'])).toBeInTheDocument();
    });
});
it('toggles password visibility when the visibility button is clicked', () => {
    render(
        <SignUpPage5
            canbeuser={true}
            password=""
            passwordhandler={() => {}}
            nextWindowHandler={() => {}}
        />
    );

    const visibilityButton = screen.getByLabelText('toggle password visibility');

    // Initially, the password should be hidden
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Simulate a click on the visibility button
    fireEvent.click(visibilityButton);

    // After clicking, the password should be visible
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Simulate a mouse down event on the visibility button
    fireEvent.mouseDown(visibilityButton);

    // After mouse down, the password should still be visible
    expect(passwordInput).toHaveAttribute('type', 'text');
});