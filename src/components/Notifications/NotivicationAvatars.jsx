import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import './NotificationsAvaters.css';
import { deepOrange, deepPurple } from '@mui/material/colors';
export default function NotificationAvatars({ type, useravatar }) {
    return (
        <>
            <div className="Notification-avatar-box1">
                <Avatar src={type} sx={{ width: 30, height: 30 }}></Avatar>
            </div>
            <div className="Notification-avatar-box2">
                <Avatar
                    src={`http://tweaxybackend.mywire.org/api/v1/images/${useravatar}`}
                    sx={{ width: 30, height: 30 }}
                ></Avatar>
            </div>
        </>
    );
}
