import SignUpPage3 from './SignUpPage3';
import { render, screen, fireEvent } from '@testing-library/react';
import { useEffect } from 'react';
import React from 'react';
import '@testing-library/jest-dom';
import * as EmailAPI from '../../apis/Email';
it('should render the component with the correct title and fields when Data1 and Data2 are empty objects', () => {
    // Arrange
    const Data1 = {};
    const Data2 = {};
    const EditInformation = jest.fn();
    const nextWindowHandler = jest.fn();

    // Act
    render(
        <SignUpPage3
            Data1={Data1}
            Data2={Data2}
            EditInformation={EditInformation}
            nextWindowHandler={nextWindowHandler}
        />
    );

    // Assert
    expect(screen.getByText('Create your account')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
});
