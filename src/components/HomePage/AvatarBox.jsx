import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import './Avatar.css';
export default function AvatarBox({ img }) {
    if (!img || typeof img !== 'string' || !img) {
        // console.log('not image path');
    }

    return (
        <div className="avatar-box">
            <Avatar
                src={`http://tweaxybackend.mywire.org/api/v1/images/${img}`}
            ></Avatar>
        </div>
    );
}
