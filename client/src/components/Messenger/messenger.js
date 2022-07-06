import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// const URL = 'http://localhost:3060';
// const socket = io(URL, { autoConnect: true });
const socket = io('localhost');

function Messenger() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });
        socket.on('disconnect', () => {
            setIsConnected(false);
        });
        socket.on('message', (data) => {
            setLastMessage(data);
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('message');
        };
    });

    const sendMessage = () => {
        socket.emit('hello!');
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>Connected: {'' + isConnected}</p>
                <p>Last message: {lastMessage || '-'}</p>
                <button onClick={sendMessage}>Say hello!</button>
            </header>
        </div>
    );
}

export default Messenger;
