import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { selectUser } from '../../redux/reducers/authSlice';
import Follow from './followBtn';
import OnChat from './chatBtn';
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
                        {currentUser && <OnChat id={profile.id} />}
                        <Follow username={profile.username} following={profile.following} />
                    </>
                )}
            </div>
        </div>
    );
};

export default memo(UserInfo);
