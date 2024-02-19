import React from 'react';
import { render } from '@testing-library/react';
import NotificationAvatars from './NotivicationAvatars';
import '@testing-library/jest-dom';
describe('NotificationAvatars', () => {
    it('renders avatars with correct src and styles', () => {
        const type = 'typeSrc';
        const userAvatar = 'userAvatar.jpg';

        const { container } = render(
            <NotificationAvatars type={type} useravatar={userAvatar} />
        );

        const avatarBoxes = container.querySelectorAll(
            '.Notification-avatar-box1, .Notification-avatar-box2'
        );
        expect(avatarBoxes.length).toBe(2);

        const avatar1 = container.querySelector(
            '.Notification-avatar-box1 img'
        );
        expect(avatar1).toHaveAttribute('src', type);
        expect(avatar1).toHaveStyle({
            width: '100%',
            height: '100%',
        });
        const avatar2 = container.querySelector(
            '.Notification-avatar-box2 img'
        );
        expect(avatar2).toHaveAttribute(
            'src',
            `https://tweaxybackend.mywire.org/api/v1/images/${userAvatar}`
        );
        expect(avatar2).toHaveStyle({
            width: '100%',
            height: '100%',
        });
    });
});
