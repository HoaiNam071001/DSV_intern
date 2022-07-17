const ChatUser = ({ room, status }) => {
    if (!room) return <div className="messenger-body-header d-flex"></div>;
    return (
        <div className="messenger-body-header d-flex">
            <div className="chatbox-image">
                <img src={room.members?.image} alt="Avatar" />
            </div>
            <div className="chatbox-header-info d-flex justify-content-center flex-column">
                <div className="chatbox-info-name">{room.members?.username}</div>
                <div className={`chatbox-info-status ${status ? 'active' : ''}`}>
                    {status ? 'Online' : 'Offline'}
                </div>
            </div>
            <div className="btn-videocall ms-auto align-self-center">
                <i className="bi bi-camera-video"></i>
            </div>
        </div>
    );
};

export default ChatUser;
