import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ChatIcon from '@mui/icons-material/Chat';
import { getMessByUser } from '../../redux/reducers/messengerSlice';

const OnChat = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChat = () => {
        dispatch(getMessByUser({ userId: id })).then(() => {
            navigate('/messages');
        });
    };
    return (
        <button
            onClick={handleChat}
            className="float-end d-flex align-items-center btn-chat-profile"
        >
            <ChatIcon className="mx-1" />
            Chat
        </button>
    );
};

export default OnChat;
