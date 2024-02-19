import React from 'react';
import { render } from '@testing-library/react';
import EditProfilePage from './EditProfilePage';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom';

const mockStore = configureMockStore()({});

describe('<EditProfilePage />', () => {
    const curuser = {
        name: 'John Doe',
        bio: 'Test bio',
        location: 'Test location',
        birthdayDate: new Date('2000-01-01'),
        avatar: 'avatar.jpg',
        cover: 'cover.jpg',
    };
    it('renders without crashing', () => {
        render(
            <Provider store={mockStore}>
                <EditProfilePage
                    curuser={curuser}
                    onClose={() => {}}
                    authToken=""
                    setMessage={() => {}}
                />
            </Provider>
        );
    });

    it('displays the user profile data correctly', () => {
        const curuser = {
            name: 'John Doe',
            bio: 'Test bio',
            location: 'Test location',
            birthdayDate: new Date('2000-01-01'),
            avatar: 'avatar.jpg',
            cover: 'cover.jpg',
        };

        const { getByLabelText } = render(
            <Provider store={mockStore}>
                <EditProfilePage
                    curuser={curuser}
                    onClose={() => {}}
                    authToken=""
                    setMessage={() => {}}
                />
            </Provider>
        );

        expect(getByLabelText('Name')).toHaveValue(curuser.name);

        expect(getByLabelText('Bio')).toHaveValue(curuser.bio);
    });
});
