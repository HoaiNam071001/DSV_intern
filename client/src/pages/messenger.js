import React, { useEffect, useState } from 'react';

import { selectIsAuthenticated, selectAuthSlice } from '../redux/reducers/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms, selectRooms } from '../redux/reducers/roomSlice';
import { selectMessages, addMessage } from '../redux/reducers/messengerSlice';
import { Link } from 'react-router-dom';

import List from '../components/Messenger/list';
import Chatuser from '../components/Messenger/chatUser';
import ChatBox from '../components/Messenger/chatbox';
import CallBox from '../components/Messenger/callbox';
import SearchInput from '../components/Search/searchInput';
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_SERVER, {
    reconnection: false,
    autoConnect: false,
    secure: true,
});

const Messenger = () => {
    const authenticated = useSelector(selectIsAuthenticated);

    const auth = useSelector(selectAuthSlice);
    const { rooms } = useSelector(selectRooms);
    const { messenger, room, status } = useSelector(selectMessages);
    const dispatch = useDispatch();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [roomStatus, setRoomStatus] = useState([]);
    const [roomCall, setRoomCall] = useState();

    useEffect(() => {
        dispatch(getRooms());
    }, [dispatch]);

    useEffect(() => {
        if (authenticated) {
            socket.auth = { token: auth.token };
            socket.connect(process.env.REACT_APP_SERVER);
            socket.on('connect', () => {
                setIsConnected(true);
            });
            socket.on('disconnect', () => {
                setIsConnected(false);
            });
            socket.on('status', (user) => {
                if (user?.status === 'online') {
                    setRoomStatus((pre) => (!pre.includes(user.id) ? [...pre, user.id] : pre));
                } else if (user?.status === 'offline') {
                    setRoomStatus((pre) => pre.filter((id) => id !== user.id));
                }
            });
            socket.on('receive', ({ message }, roomId) => {
                if (message) dispatch(addMessage({ message, roomId }));
            });
            socket.on('call-connected', ({ roomId, userId }) => {
                if (auth.user?.id !== userId) setRoomCall((pre) => (pre ? pre : roomId));
            });
            socket.on('call-disconnected', ({ roomId, userId }) => {
                if (auth.user?.id !== userId) setRoomCall((pre) => (pre === roomId ? null : pre));
            });
            return () => {
                socket.off('connect');
                socket.off('disconnect');
                socket.off('status');
                socket.off('receive');
                socket.off('call-connected');
                socket.off('call-disconnected');
                socket.disconnect();
            };
        }
    }, [auth, authenticated, dispatch]);

    useEffect(() => {
        if (rooms && isConnected) {
            const roomList = rooms.map((room) => {
                return { id: room.id, memberId: room.members.id };
            });
            socket.emit('join', { roomList }, (rooms) => {
                setRoomStatus((pre) => [...pre, ...rooms.filter((id) => !pre.includes(id))]);
            });
        }
    }, [rooms, isConnected]);

    if (!authenticated)
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: '600px', width: '100%', background: '#fff' }}
            >
                <h1>
                    Please <Link to="/login">login</Link> to use this feature
                </h1>
            </div>
        );
    return (
        <div className="messenger-container container">
            <div className="row">
                <div className="col-12 col-xl-10 offset-xl-1">
                    <div className="row">
                        <CallBox
                            socket={socket}
                            userCall={rooms.find((room) => room.id === roomCall)}
                            setCall={setRoomCall}
                            authId={auth.user?.id}
                        />
                        <div className="col-md-6 col-sm-12">
                            <SearchInput />
                        </div>
                        <div className="col-md-6 col-sm-12"></div>
                        <div className="col-md-4 col-sm-12">
                            <List roomStatus={roomStatus} />
                        </div>
                        <div className="col-md-8 col-sm-12">
                            <div className="messenger-body">
                                {status === 'idle' ? (
                                    <img
                                        src={require('../Assets/onlinechat.jpg')}
                                        alt="Logo messenger"
                                    />
                                ) : (
                                    <>
                                        <Chatuser
                                            socket={socket}
                                            room={room}
                                            authId={auth.user?.id}
                                            status={roomStatus.includes(room?.members?.id)}
                                        />
                                        <ChatBox
                                            socket={socket}
                                            room={room}
                                            messenger={messenger}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messenger;
