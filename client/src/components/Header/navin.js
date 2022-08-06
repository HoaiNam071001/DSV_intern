import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../redux/reducers/authSlice';
import { useNavigate } from 'react-router';
import Avatar from '@mui/material/Avatar';
const avatar = require('../../Assets/avatar-thumbnail.jpg');

const NavLogin = () => {
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const LogOutUser = () => {
        dispatch(logout());
        navigate('/');
    };
    return (
        <>
            <Tooltip title="New Article" placement="bottom" arrow>
                <Link
                    to="/editor"
                    className="mx-3 btn-header d-flex align-items-center justify-content-center"
                >
                    <i className="bi bi-plus-circle fs-3"></i>
                </Link>
            </Tooltip>
            <Tooltip title="Chat box" placement="bottom" arrow>
                <Link
                    to="/messages"
                    className="mx-3 btn-header d-flex align-items-center justify-content-center"
                >
                    <i className="bi bi-messenger fs-3"></i>
                </Link>
            </Tooltip>
            <div className="px-3">
                <div
                    className="nav-link d-flex align-items-center"
                    role="button"
                    data-bs-toggle="dropdown"
                >
                    <Avatar alt="avatar" src={currentUser.image}>
                        <img
                            width="40"
                            height="40"
                            className="rounded-circle"
                            alt="avatar"
                            src={avatar}
                        />
                    </Avatar>
                </div>

                <ul className="dropdown-menu dropdown-menu-end">
                    <li className="nav-item-dropdown">
                        <Link
                            to={`/@${currentUser?.username}`}
                            className="dropdown-item item-profile d-flex align-items-center"
                        >
                            <Avatar alt="avatar" src={currentUser.image}>
                                <img
                                    width="30"
                                    height="30"
                                    className="rounded-circle"
                                    alt="avatar"
                                    src={avatar}
                                />
                            </Avatar>
                            <span className="p-1 text-truncate" style={{ maxWidth: 150 }}>
                                {currentUser?.username}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className="dropdown-item">
                            <i className="bi bi-gear"></i>
                            <span className="p-1 ">Edit Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/setpassword" className="dropdown-item">
                            <i className="bi bi-shield-lock"></i>
                            <span className="p-1 ">Change password</span>
                        </Link>
                    </li>

                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={LogOutUser}>
                            <i className="bi bi-box-arrow-right"></i>
                            <span className="p-1 ">Log Out</span>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};
export default NavLogin;
