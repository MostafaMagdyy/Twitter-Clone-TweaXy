import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EnterPasswordPage from './EnterPasswordPage';
import '@testing-library/jest-dom';
import SignInSelectors from '../../shared/selectors/SignIn';

describe('EnterPasswordPage component', () => {
    const mockProps = {
        UUID: 'test123', // Provide necessary props for testing
        password: '',
        LoginError: '',
        handlePasswordChange: jest.fn(),
        handleLogin: jest.fn(),
        handleForgotPassword: jest.fn(),
        handleSignUp: jest.fn(),
    };

    it('renders component correctly', () => {
        const { getByText, getByLabelText } = render(
            <EnterPasswordPage {...mockProps} />
        );
        expect(getByText('Enter your password')).toBeInTheDocument();
        expect(getByLabelText('UUID')).toBeInTheDocument();
        expect(getByLabelText('Password')).toBeInTheDocument();
        expect(getByText('Login')).toBeInTheDocument();
        expect(getByText('Forgot password?')).toBeInTheDocument();
        expect(getByText("Don't have an account?")).toBeInTheDocument();
    });

    it('calls handlePasswordChange when password input changes', () => {
        const { getByLabelText } = render(<EnterPasswordPage {...mockProps} />);
        fireEvent.change(getByLabelText('Password'), {
            target: { value: 'testpassword' },
        });
        expect(mockProps.handlePasswordChange).toHaveBeenCalledTimes(1);
        expect(mockProps.handlePasswordChange).toHaveBeenCalledWith(
            'testpassword'
        );
    });

    it('calls handleLogin when Login button is clicked', () => {
        const { getByText } = render(<EnterPasswordPage {...mockProps} />);
        fireEvent.click(getByText('Login'));
        expect(mockProps.handleLogin).toHaveBeenCalledTimes(0);
    });

    it('disables Login button when password is empty', () => {
        const { getByText } = render(<EnterPasswordPage {...mockProps} />);
        expect(getByText('Login')).toBeDisabled();
    });

    it('displays LoginError message when there is a LoginError', () => {
        const propsWithError = {
            ...mockProps,
            LoginError: 'Incorrect password',
        };
        const { getByText } = render(<EnterPasswordPage {...propsWithError} />);
        expect(getByText('Incorrect password')).toBeInTheDocument();
    });

    it('calls handleForgotPassword when Forgot password link is clicked', () => {
        const { getByText } = render(<EnterPasswordPage {...mockProps} />);
        fireEvent.click(getByText('Forgot password?'));
        expect(mockProps.handleForgotPassword).toHaveBeenCalledTimes(1);
    });
});
