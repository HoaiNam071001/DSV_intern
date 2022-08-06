//import { LoadingWrite } from '../Loading';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
    selectMessages,
    messUnloaded,
    updateMessage,
    addMessage,
    getMessByRoom,
} from '../../redux/reducers/messengerSlice';
import { selectUser } from '../../redux/reducers/authSlice';
import Picker from 'emoji-picker-react';
import VideoIcon from '@mui/icons-material/VideoCameraFront';
import dayjs from 'dayjs';
import { Skeletonchatbox } from './skeleton';

const ItemMess = ({ mess, iscurrent }) => {
    return (
        <div
            className={`chatbox-content-item d-flex ${
                iscurrent ? 'justify-content-end ' : 'justify-content-start'
            }`}
            title={dayjs(mess.updatedAt).format('DD/MM/YYYY HH:mm')}
        >
            {mess.content === ':<<<<<callvideo>>>>>:' ? (
                <div
                    className={`content-item-call ${iscurrent ? 'chatbox-right ' : 'chatbox-left'}`}
                >
                    <VideoIcon />
                    Video chat
                </div>
            ) : (
                <div className={`chatbox-x ${iscurrent ? 'chatbox-right ' : 'chatbox-left'}`}>
                    {mess.content}
                </div>
            )}
        </div>
    );
};
function Chatbox({ socket, messenger, room }) {
    const dispatch = useDispatch();
    const { count } = useSelector(selectMessages);
    const currentUser = useSelector(selectUser);
    const [content, setContent] = useState('');
    const _inputchat = useRef(null);
    const add = () => {
        if (/^ *$/.test(content)) return;
        const messageClient = { content, id: uuidv4(), createdAt: Date.now(), sender: currentUser };
        dispatch(addMessage({ message: messageClient }));
        socket.emit('send', { message: messageClient, roomId: room.id }, ({ message }) => {
            if (message) dispatch(updateMessage({ message, id: messageClient.id }));
        });
        setContent('');
        _inputchat.current.focus();
    };
    const keyPress = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) add();
    };
    const olderMessages = () => {
        dispatch(getMessByRoom({ roomId: room.id, next: true }));
    };

    const onEmojiClick = (event, emojiObject) => {
        setContent((pre) => pre + emojiObject.emoji);
    };
    useEffect(() => () => dispatch(messUnloaded()), [dispatch]);

    if (!messenger) return <Skeletonchatbox />;

    return (
        <>
            <div className="body-chatbox d-flex flex-column-reverse">
                <div className="d-flex flex-column-reverse">
                    {messenger.map((mess) => {
                        return (
                            <ItemMess
                                mess={mess}
                                key={mess.id}
                                iscurrent={mess.sender.id === currentUser.id}
                            />
                        );
                    })}
                </div>

                {count && count.currentCount !== count.totalCount && (
                    <button onClick={olderMessages}>Older messages</button>
                )}
            </div>
            <div className="input-chatbox row">
                <div className="chatbox-message col-10 d-flex">
                    <input
                        ref={_inputchat}
                        className="col-11"
                        placeholder="Type a message"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={keyPress}
                    />
                    <div className="col-1 icon-chatbox d-flex justify-content-end">
                        <div
                            className="nav-link d-flex align-items-center"
                            role="button"
                            data-bs-toggle="dropdown"
                        >
                            <i className="bi bi-emoji-smile"></i>
                        </div>

                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <Picker onEmojiClick={onEmojiClick} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="chatbox-send col-2 d-flex justify-content-center align-items-center">
                    <button onClick={add}>
                        <i className="bi bi-send-fill"></i>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Chatbox;
