import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddTaskIcon from '@mui/icons-material/AddTask';

import { follow, unfollow } from '../../redux/reducers/profileSlice';
import { selectUser } from '../../redux/reducers/authSlice';

const Follow = ({ username, following }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);

    const handleClick = () => {
        if (!currentUser) return navigate(`/login`);

        if (following) dispatch(unfollow({ username }));
        else dispatch(follow({ username }));
    };

    return (
        <button
            onClick={handleClick}
            className={`float-end d-flex align-items-center btn-follow-profile ${
                following ? 'btn-follow-profile-active' : ''
            }`}
        >
            <AddTaskIcon />
            {following ? 'Unfollow' : 'Follow'}
        </button>
    );
};

export default Follow;
