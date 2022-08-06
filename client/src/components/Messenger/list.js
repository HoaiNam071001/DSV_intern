import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRooms } from '../../redux/reducers/roomSlice';
import { getMessByRoom, messUnUser, selectRoom } from '../../redux/reducers/messengerSlice';
import Badge from '@mui/material/Badge';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
const Avt = require('../../Assets/avatar-thumbnail.jpg');
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
                            background: status === true ? '#0DFF00' : '#e8e8e8',
                            height: 15,
                            minWidth: 15,
                            bottom: 3,
                            right: 3,
                        },
                    }}
                >
                    <Avatar alt="avatar" src={room.members.image}>
                        <img width="30" height="30" alt="author" src={Avt} />
                    </Avatar>
                </Badge>
            </div>
            <Tooltip title={room.members?.username} placement="right" arrow>
                <div className="col-8 item-user-mess text-truncate">{room.members?.username}</div>
            </Tooltip>
        </button>
    );
};

function MessengerList({ roomStatus }) {
    const { rooms } = useSelector(selectRooms);
    const CurrentRoom = useSelector(selectRoom);
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    if (!rooms) return <div>Loading</div>;
    return (
        <div className="messenger-list-container">
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <QuestionAnswerIcon />
                </ListItemIcon>
                <ListItemText primary="List Chat" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
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
            </Collapse>
        </div>
    );
}

export default memo(MessengerList);
