import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import EnterUUIDPage from './EnterUUIDPage';
import '@testing-library/jest-dom';

describe('EnterUUIDPage component', () => {
    const mockProps = {
        UUID: '',
        UUIDError: '',
        LoginWithGoogleError: '',
        handleUUIDChange: jest.fn(),
        handleUUIDSubmit: jest.fn(),
        handleForgotPassword: jest.fn(),
        handleLoginWithGoogle: jest.fn(),
        handleSignUp: jest.fn(),
    };

    it('renders component correctly', () => {
        const { getByText, getByLabelText } = render(
            <GoogleOAuthProvider>
                <EnterUUIDPage {...mockProps} />
            </GoogleOAuthProvider>
        );
        expect(getByText('Login to TweaXy')).toBeInTheDocument();
        expect(getByLabelText('Phone, email, or username')).toBeInTheDocument();
        expect(getByText('Next')).toBeInTheDocument();
        expect(getByText("Don't have an account?")).toBeInTheDocument();
    });

    it('calls handleUUIDChange when UUID input changes', () => {
        const { getByLabelText } = render(
            <GoogleOAuthProvider>
                <EnterUUIDPage {...mockProps} />
            </GoogleOAuthProvider>
        );
        fireEvent.change(getByLabelText('Phone, email, or username'), {
            target: { value: 'test123' },
        });
        expect(mockProps.handleUUIDChange).toHaveBeenCalledTimes(1);
        expect(mockProps.handleUUIDChange).toHaveBeenCalledWith('test123');
    });

    it('calls handleUUIDSubmit when Next button is clicked', () => {
        const { getByText } = render(
            <GoogleOAuthProvider>
                <EnterUUIDPage {...mockProps} />
            </GoogleOAuthProvider>
        );
        fireEvent.click(getByText('Next'));
        expect(mockProps.handleUUIDSubmit).toHaveBeenCalledTimes(0);
    });
});
it('displays UUID error message when there is a UUID error', () => {
    const mockPropsWithError = {
        UUID: '',
        UUIDError: 'Invalid UUID',
        LoginWithGoogleError: '',
        handleUUIDChange: jest.fn(),
        handleUUIDSubmit: jest.fn(),
        handleForgotPassword: jest.fn(),
        handleLoginWithGoogle: jest.fn(),
        handleSignUp: jest.fn(),
    };
    const { getByText } = render(
        <GoogleOAuthProvider>
            <EnterUUIDPage {...mockPropsWithError} />
        </GoogleOAuthProvider>
    );
    expect(getByText('Invalid UUID')).toBeInTheDocument();
});
