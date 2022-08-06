import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { follow, unfollow } from '../../redux/reducers/articleSlice';
import Tooltip from '@mui/material/Tooltip';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';

const FollowUser = ({ username, following }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClickFollow = () => {
        if (!username) return navigate(`/login`);
        if (following) dispatch(unfollow({ username }));
        else dispatch(follow({ username }));
    };

    return (
        <Tooltip title={(following ? 'Follow ' : 'Unfollow ') + username} placement="top" arrow>
            <button
                className={`m-1 btn-article btn-follow-article ${
                    following ? 'btn-follow-article-active' : ''
                }`}
                onClick={handleClickFollow}
            >
                <FollowTheSignsIcon /> &nbsp;
                {following ? 'Unfollow' : 'Follow'}
            </button>
        </Tooltip>
    );
};

export default FollowUser;
