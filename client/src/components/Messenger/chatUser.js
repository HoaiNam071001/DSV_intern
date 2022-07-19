import { Link } from 'react-router-dom';

const ChatUser = ({ room, status }) => {
    if (!room) return <div className="messenger-body-header d-flex"></div>;
    return (
        <div className="messenger-body-header d-flex">
            <Link to={`/@${room.members?.username}`} className="chatbox-image">
                <img src={room.members?.image} alt="Avatar" />
            </Link>
            <div className="chatbox-header-info d-flex justify-content-center flex-column">
                <Link to={`/@${room.members?.username}`} className="chatbox-info-name">
                    {room.members?.username}
                </Link>
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
