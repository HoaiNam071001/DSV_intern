import React, { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddTaskIcon from '@mui/icons-material/AddTask';

import { follow, unfollow } from '../../redux/reducers/profileSlice';
import { selectUser } from '../../redux/reducers/authSlice';
import { getMessByUser } from '../../redux/reducers/messengerSlice';

import { ItemLoading } from '../Loading';
import UploadAvatar from './uploadAvatar';
const Setting = () => {
    return (
        <Link to="/settings" className="btn-edit-profile d-flex align-items-center">
            <BorderColorIcon />
            Edit Profile
        </Link>
    );
};

const Follow = ({ username, following }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);

    const handleClick = () => {
        if (!currentUser) {
            navigate(`/login`);
            return;
        }

        if (following) {
            dispatch(unfollow({ username }));
        } else {
            dispatch(follow({ username }));
        }
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

const OnChat = ({ profile }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChat = () => {
        dispatch(getMessByUser({ userId: profile.id }));
        navigate(`/messages`);
    };
    return (
        <button
            onClick={handleChat}
            className={`float-end d-flex align-items-center btn-follow-profile 
            }`}
        >
            Chat
        </button>
    );
};

const UserInfo = ({ profile }) => {
    const currentUser = useSelector(selectUser);
    const isCurrentUser = profile.id === currentUser?.id;
    const [modal, setModal] = useState(false);
    const changeAvatar = () => {
        if (isCurrentUser) setModal(!modal);
    };
    return (
        <div id="topscroll" className="p-3 container-info-profile">
            <div className="d-flex justify-content-center">
                <div
                    className={`rounded-circle text-center container-avt-img ${
                        isCurrentUser ? 'current-user' : ''
                    }`}
                    onClick={changeAvatar}
                >
                    <img
                        src={profile.image || require('../../Assets/avatar-thumbnail.jpg')}
                        className="avt-img rounded-circle"
                        alt={profile.username}
                    />
                </div>
                {modal && (
                    <UploadAvatar
                        image={profile.image}
                        setModal={setModal}
                        username={profile.username}
                    />
                )}
            </div>
            <div className="text-center m-2">
                {profile.username ? (
                    <div className="fs-3 username-profile">{profile.username}</div>
                ) : (
                    <ItemLoading />
                )}
                <div className="fs-5 bio-profile">{profile.bio}</div>
            </div>

            <div className="d-flex justify-content-end">
                {isCurrentUser ? (
                    <Setting />
                ) : (
                    <>
                        {currentUser && <OnChat profile={profile} />}
                        <Follow username={profile.username} following={profile.following} />
                    </>
                )}
            </div>
        </div>
    );
};

export default memo(UserInfo);
