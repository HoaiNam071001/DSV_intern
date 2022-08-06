import React from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../redux/reducers/messengerSlice';
import { SkeletonChatUser } from './skeleton';
import Avatar from '@mui/material/Avatar';
const Avt = require('../../Assets/avatar-thumbnail.jpg');

import { Link } from 'react-router-dom';
const ChatUser = ({ room, status, authId, socket }) => {
    const dispatch = useDispatch();
    const handleVideoCall = () => {
        const roomid = room.id;
        const windowref = window.open(
            `/videocall?room=${roomid}&iscaller=true&auth=${authId}`,
            '',
            'height=500,width=800,left=300,top=100'
        );
        windowref.onload = function () {
            windowref.onunload = function () {
                socket.emit('call-end', roomid, authId, true, ({ message, roomId }) => {
                    if (message) dispatch(addMessage({ message, roomId }));
                });
            };
        };
    };
    if (!room) return <SkeletonChatUser />;
    return (
        <div className="messenger-body-header d-flex">
            <Link to={`/@${room.members?.username}`} className="chatbox-image">
                <Avatar alt="avatar" src={room.members?.image}>
                    <img width="30" height="30" alt="Avatar" src={Avt} />
                </Avatar>
            </Link>
            <div className="chatbox-header-info d-flex justify-content-center flex-column">
                <Link to={`/@${room.members?.username}`} className="chatbox-info-name">
                    {room.members?.username}
                </Link>
                <div className={`chatbox-info-status ${status ? 'active' : ''}`}>
                    {status ? 'Online' : 'Offline'}
                </div>
            </div>
            <div className="ms-auto align-self-center">
                <button className="btn-videocall " onClick={handleVideoCall}>
                    <i className="bi bi-camera-video"></i>
                </button>
            </div>
        </div>
    );
};

export default ChatUser;
