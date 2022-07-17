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

function Chatbox({ socket, messenger, room }) {
    const dispatch = useDispatch();
    const { count } = useSelector(selectMessages);
    const currentUser = useSelector(selectUser);
    const [content, setContent] = useState('');
    const _inputchat = useRef(null);
    const add = () => {
        if (content === '') return;
        const messageClient = { content, id: uuidv4(), createdAt: Date.now(), sender: currentUser };
        dispatch(addMessage({ message: messageClient }));
        socket.emit('send', { message: messageClient, to: room.id }, ({ message }) => {
            if (message) dispatch(updateMessage({ message, id: messageClient.id }));
        });
        setContent('');
        _inputchat.current.focus();
    };

    const olderMessages = () => {
        dispatch(getMessByRoom({ roomId: room.id, next: true }));
    };

    useEffect(() => () => dispatch(messUnloaded()), [dispatch]);

    if (!messenger) return <div className="messenger-body"></div>;

    return (
        <>
            <div className="body-chatbox d-flex flex-column-reverse">
                {/* <div className="loading-write d-flex align-items-center justify-content-center">
                    <LoadingWrite />
                </div> */}
                <div className="d-flex flex-column-reverse">
                    {messenger.map((mess) => {
                        if (mess.sender.id === currentUser.id)
                            return (
                                <div
                                    title={mess.updatedAt}
                                    key={mess.id}
                                    className="chatbox-right d-flex align-items-end flex-column"
                                >
                                    <div className="chatbox-content-item">{mess.content}</div>
                                </div>
                            );
                        return (
                            <div
                                title={mess.updatedAt}
                                key={mess.id}
                                className="chatbox-left d-flex"
                            >
                                <div className="chatbox-image">
                                    <img src={mess.sender.image} alt="Avatar" />
                                </div>
                                <div className="chatbox-content d-flex align-items-start flex-column">
                                    <div className="chatbox-content-item">{mess.content}</div>
                                </div>
                            </div>
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
                        onKeyUp={(e) => (e.key === 'Enter' ? add() : null)}
                    />
                    <div className="col-1 icon-chatbox d-flex justify-content-end">
                        <i className="bi bi-emoji-smile"></i>
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
