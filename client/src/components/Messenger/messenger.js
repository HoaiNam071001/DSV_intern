import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// const URL = 'http://localhost:3060';
// const socket = io(URL, { autoConnect: true });
const socket = io('localhost', { reconnection: false });

function Messenger() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });
        socket.on('disconnect', () => {
            setIsConnected(false);
        });
        socket.on('private message', (data) => {
            const node = document.createElement('li');
            const textnode = document.createTextNode(`${data.from}: ${data.content}`);
            node.appendChild(textnode);
            document.getElementById('message').appendChild(node);
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('private message');
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('private message', { content: message, to: user });
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>Connected: {'' + isConnected}</p>
                <input value={user} onChange={(e) => setUser(e.target.value)} />
                <input value={message} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
                <ul id="message"></ul>
            </header>
        </div>
    );
}

export default Messenger;
