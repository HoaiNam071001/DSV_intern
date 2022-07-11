function MessengerList() {
    return (
        <div className="messenger-list">
            <div className="messenger-item row">
                <div className="col-3 item-image d-flex align-items-center justify-content-center">
                    <img src={require('../../Assets/avatar-thumbnail.jpg')} width="30" height="30" alt="Avatar" />
                </div>
                <div className="col-8 item-user-mess">
                    <div className="item-username">Name</div>
                    <div className="item-message">I love You! </div>
                </div>
            </div>
            <hr />
            <div className="messenger-item row">
                <div className="col-3 item-image d-flex align-items-center justify-content-center">
                    <img src={require('../../Assets/avatar-thumbnail.jpg')} width="30" height="30" alt="Avatar" />
                </div>
                <div className="col-8  item-user-mess">
                    <div className="item-username">Name</div>
                    <div className="item-message">I love You! </div>
                </div>
            </div>
            <hr />
            <div className="messenger-item row">
                <div className="col-3 item-image d-flex align-items-center justify-content-center">
                    <img src={require('../../Assets/avatar-thumbnail.jpg')} width="30" height="30" alt="Avatar" />
                </div>
                <div className="col-8 item-user-mess">
                    <div className="item-username">Name</div>
                    <div className="item-message">I love You! </div>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default MessengerList;

//import React, { useState, useEffect } from 'react';
//import { io } from 'socket.io-client';

//const socket = io('localhost', { reconnection: false });
// const [isConnected, setIsConnected] = useState(socket.connected);
// const [user, setUser] = useState('');
// const [message, setMessage] = useState('');
// useEffect(() => {
//     socket.on('connect', () => {
//         setIsConnected(true);
//     });
//     socket.on('disconnect', () => {
//         setIsConnected(false);
//     });
//     socket.on('private message', (data) => {
//         const node = document.createElement('li');
//         const textnode = document.createTextNode(`${data.from}: ${data.content}`);
//         node.appendChild(textnode);
//         document.getElementById('message').appendChild(node);
//     });
//     return () => {
//         socket.off('connect');
//         socket.off('disconnect');
//         socket.off('private message');
//     };
// }, []);

// const sendMessage = (e) => {
//     e.preventDefault();
//     socket.emit('private message', { content: message, to: user });
// };
