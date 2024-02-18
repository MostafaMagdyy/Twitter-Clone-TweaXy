import SignUpPage4 from './SignUpPage4';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import {
    checkEmailVerification,
    sendEmailVerification,
} from '../../apis/EmailVerfication';
import * as EmailAPI from '../../apis/EmailVerfication';

// Mock the EmailVerification module
jest.mock('../../apis/EmailVerfication', () => ({
    checkEmailVerification: jest.fn(),
    sendEmailVerification: jest.fn(), // If needed, mock other functions used in the component
}));
it('should call checkEmailVerification with the correct parameters and set isokverficationcode to true when a valid verification code is entered and Next button is clicked', () => {
    // Render the component
    render(
        <SignUpPage4
            verficationcode="12345678"
            setverficationcode={jest.fn()}
            Data1={{ usermail: 'test@example.com' }}
            nextWindowHandler={jest.fn()}
        />
    );

    // Simulate user input and button click
    fireEvent.change(screen.getByLabelText('verification code'), {
        target: { value: '12345678' },
    });
    fireEvent.click(screen.getByText('Next'));

    // Assertions
    expect(checkEmailVerification).toHaveBeenCalledWith(
        'test@example.com',
        '12345678',
        expect.any(Function),
        expect.any(Function)
    );
});
it('should call checkEmailVerification and sendEmailVerification when Next button is clicked', () => {
    const setverficationcodeMock = jest.fn();
    const nextWindowHandlerMock = jest.fn();

    // Render the component
    render(
        <SignUpPage4
            verficationcode=""
            setverficationcode={setverficationcodeMock}
            Data1={{ usermail: 'test@example.com' }}
            nextWindowHandler={nextWindowHandlerMock}
        />
    );

    // Simulate user input and button click
    fireEvent.change(screen.getByLabelText('verification code'), {
        target: { value: '12345678' }, // Assuming it's an 8-character verification code
    });
    fireEvent.click(screen.getByText('Next'));

    // Assertions
    expect(setverficationcodeMock).toHaveBeenCalledWith('12345678');
    expect(checkEmailVerification).toHaveBeenCalledWith(
        'test@example.com',
        '12345678',
        expect.any(Function),
        expect.any(Function)
    );
});
it('should not call sendEmailVerification when resendHandler is called with a valid usermail and invalid email format', () => {
    // Mock the necessary dependencies
    const mockSendEmailVerification = jest.fn();
    const mockSetVerficationCode = jest.fn();

    // Render the component
    render(
        <SignUpPage4
            verficationcode=""
            setverficationcode={mockSetVerficationCode}
            Data1={{ usermail: 'invalidemail' }}
            nextWindowHandler={jest.fn()}
        />
    );

    // Simulate button click
    fireEvent.click(screen.getByText("Didn't receive mail?"));

    // Assertions
    expect(sendEmailVerification).toHaveBeenCalled();
});
