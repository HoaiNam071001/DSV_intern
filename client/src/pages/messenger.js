import React, { useEffect, useState } from 'react';

import { selectUser } from '../redux/reducers/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms, selectRooms } from '../redux/reducers/roomSlice';
import { selectMessages, addMessage } from '../redux/reducers/messengerSlice';

import List from '../components/Messenger/list';
import Chatuser from '../components/Messenger/chatUser';
import ChatBox from '../components/Messenger/chatbox';

import { io } from 'socket.io-client';
const socket = io('localhost', { reconnection: false });

const Messenger = () => {
    const currentUser = useSelector(selectUser);
    const { rooms } = useSelector(selectRooms);
    const { messenger, room, status } = useSelector(selectMessages);
    const dispatch = useDispatch();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [roomStatus, setRoomStatus] = useState([]);
    useEffect(() => {
        dispatch(getRooms());
    }, [dispatch]);

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
    useEffect(() => {
        socket.auth = { userId: currentUser.id };
        socket.connect();

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
        socket.on('receive', ({ message }) => {
            if (message) dispatch(addMessage({ message }));
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('status');
            socket.off('receive');
            socket.disconnect();
        };
    }, [currentUser.id, dispatch]);
    if (!currentUser) return <div>Unauthorized</div>;

    return (
        <div className="messenger-container container">
            <div className="row">
                <div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
                    <div className="row">
                        <div className="col-md-4">
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
                                            room={room}
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
