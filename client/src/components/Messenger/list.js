import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRooms } from '../../redux/reducers/roomSlice';
import { getMessByRoom, messUnUser, selectRoom } from '../../redux/reducers/messengerSlice';
import Badge from '@mui/material/Badge';

const Item = ({ room, active, status }) => {
    const dispatch = useDispatch();

    const onMessenger = () => {
        dispatch(messUnUser());
        dispatch(getMessByRoom({ roomId: room.id }));
    };
    return (
        <button
            className={`messenger-item row ${active === room.id ? 'active' : ''}`}
            onClick={onMessenger}
        >
            <div className="col-3 item-image d-flex align-items-center justify-content-center">
                <Badge
                    badgeContent=" "
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    sx={{
                        '& span': {
                            background: status === true ? '#0DFF00' : '#FF0000',
                            height: 15,
                            minWidth: 15,
                            bottom: 3,
                            right: 3,
                        },
                    }}
                >
                    <img
                        src={room.members.image || require('../../Assets/avatar-thumbnail.jpg')}
                        width="30"
                        height="30"
                        alt="Avatar"
                    />
                </Badge>
            </div>
            <div className="col-8 item-user-mess">{room.members.username}</div>
        </button>
    );
};

function MessengerList({ roomStatus }) {
    const { rooms } = useSelector(selectRooms);
    const CurrentRoom = useSelector(selectRoom);

    if (!rooms) return <div>Loading</div>;
    return (
        <div className="messenger-list-container">
            <button>List Friend</button>
            <div className="messenger-list">
                {rooms.map((room) => {
                    return (
                        <div key={room.id}>
                            <Item
                                room={room}
                                active={CurrentRoom?.id}
                                status={roomStatus.includes(room.members.id) ? true : false}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default memo(MessengerList);
