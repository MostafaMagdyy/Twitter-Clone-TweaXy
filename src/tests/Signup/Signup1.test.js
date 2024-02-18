import SignUpPage1 from './SignUpPage1';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import * as EmailAPI from '../../apis/Email';

it('should render a form with input fields for name, email, and date of birth', () => {
    const nextWindowHandler = jest.fn();
    const Data1 = {
        username: '',
        usermail: '',
    };
    const changeData1 = jest.fn();
    const Data2 = {
        day: '',
        month: '',
        year: '',
    };
    const changeData2 = jest.fn();
    render(
        <SignUpPage1
            nextWindowHandler={nextWindowHandler}
            Data1={Data1}
            changeData1={changeData1}
            Data2={Data2}
            changeData2={changeData2}
        />
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Year')).toBeInTheDocument();
});
it('should render each button', () => {
    const nextWindowHandler = jest.fn();
    const Data1 = {
        username: '',
        usermail: '',
    };
    const changeData1 = jest.fn();
    const Data2 = {
        day: '',
        month: '',
        year: '',
    };
    const changeData2 = jest.fn();

    render(
        <SignUpPage1
            nextWindowHandler={nextWindowHandler}
            Data1={Data1}
            changeData1={changeData1}
            Data2={Data2}
            changeData2={changeData2}
        />
    );

    expect(screen.getByText('Next')).toBeInTheDocument();
});
jest.mock('../../apis/Email', () => ({
    isUniqeEmail: jest.fn(),
}));

it('should call the API to check email uniqueness when the email field is not empty', () => {
    const nextWindowHandler = jest.fn();
    const Data1 = {
        username: '',
        usermail: 'test@example.com',
    };
    const changeData1 = jest.fn();
    const Data2 = {
        day: '',
        month: '',
        year: '',
    };
    const changeData2 = jest.fn();

    render(
        <SignUpPage1
            nextWindowHandler={nextWindowHandler}
            Data1={Data1}
            changeData1={changeData1}
            Data2={Data2}
            changeData2={changeData2}
        />
    );

    expect(EmailAPI.isUniqeEmail).toHaveBeenCalledWith(
        Data1.usermail,
        expect.any(Function)
    );
});

it('should disable the Next button if the form is not complete', () => {
    const nextWindowHandler = jest.fn();
    const Data1 = {
        username: '',
        usermail: '',
    };
    const changeData1 = jest.fn();
    const Data2 = {
        day: '',
        month: '',
        year: '',
    };
    const changeData2 = jest.fn();

    render(
        <SignUpPage1
            nextWindowHandler={nextWindowHandler}
            Data1={Data1}
            changeData1={changeData1}
            Data2={Data2}
            changeData2={changeData2}
        />
    );
    fireEvent.change(screen.getByLabelText('Name'), {
        target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
        target: { value: 'john@example.com' },
    });
    // Assert that the Next button remains disabled
    expect(screen.getByText('Next')).toBeDisabled();
});

jest.mock('../../apis/Email', () => ({
    isUniqeEmail: jest.fn(),
}));
it('should enable the Next button when the form is completed', () => {
    const nextWindowHandler = jest.fn();
    const Data1 = {
        username: 'momagdy',
        usermail: 'Mohamed@gmail.com',
    };
    const changeData1 = jest.fn();
    const Data2 = {
        day: '5',
        month: '2',
        year: '2020',
    };
    const changeData2 = jest.fn();
    render(
        <SignUpPage1
            nextWindowHandler={nextWindowHandler}
            Data1={Data1}
            changeData1={changeData1}
            Data2={Data2}
            changeData2={changeData2}
        />
    );
    expect(screen.getByText('Next')).toBeEnabled();
});
it('should render proper days based on selected months', () => {
    const nextWindowHandler = jest.fn();
    const Data1 = {
        username: '',
        usermail: '',
    };
    const changeData1 = jest.fn();
    const Data2 = {
        day: '',
        month: '',
        year: '',
    };
    const changeData2 = jest.fn();
    render(
        <SignUpPage1
            nextWindowHandler={nextWindowHandler}
            Data1={Data1}
            changeData1={changeData1}
            Data2={Data2}
            changeData2={changeData2}
        />
    );

    fireEvent.change(screen.getByTestId('month-testid'), {
        target: { value: '9' },
    });

    const expectedDaysCount = 1;
    const daysOptions = screen.getAllByTestId('day-testid');
    expect(daysOptions).toHaveLength(expectedDaysCount);
});
