import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, logout, selectUser } from '../redux/reducers/authSlice';
import { useNavigate } from 'react-router';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const HeaderLogin = () => {
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
                    <img
                        title="Your Profile"
                        width="40"
                        height="40"
                        className="rounded-circle"
                        alt="avatar"
                        src={currentUser.image || require('../Assets/avatar-thumbnail.jpg')}
                    />
                </div>

                <ul className="dropdown-menu dropdown-menu-end">
                    <li className="nav-item-dropdown">
                        <Link
                            to={`/@${currentUser?.username}`}
                            className="dropdown-item item-profile d-flex align-items-center"
                        >
                            <img
                                title="Your Profile"
                                width="30"
                                height="30"
                                className="rounded-circle"
                                alt="avatar"
                                src={currentUser.image || require('../Assets/avatar-thumbnail.jpg')}
                            />
                            <span className="p-1 ">{currentUser?.username}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className="dropdown-item">
                            <i className="bi bi-gear"></i>
                            <span className="p-1 ">Settings</span>
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

const HeaderLogout = () => {
    return (
        <React.Fragment>
            <Link to="/login" className="sign-header">
                Sign in
            </Link>
            <Link to="/register" className="sign-header">
                Sign up
            </Link>
        </React.Fragment>
    );
};

function ElevationScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });
    return React.cloneElement(children, {
        className: trigger ? 'header-container' : 'header-scroll header-container',
    });
}
const Header = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
        <ElevationScroll>
            <nav className="header-container">
                <div className="container">
                    <div className="row">
                        <div className="col-3 d-flex align-items-center">
                            <Link to="/" className="title-header navbar-brand fs-2 fw-bolder m-1">
                                <img src={require('../Assets/logo.png')} alt="Blog" />
                            </Link>
                        </div>
                        <div className="col-9 d-flex justify-content-end align-items-center">
                            <Tooltip title="HomePage" placement="bottom" arrow>
                                <Link
                                    to="/"
                                    className="mx-3 btn-header d-flex align-items-center justify-content-center"
                                >
                                    <i className="bi bi-house-fill fs-3"></i>
                                </Link>
                            </Tooltip>

                            {isAuthenticated ? <HeaderLogin /> : <HeaderLogout />}
                        </div>
                    </div>
                </div>
            </nav>
        </ElevationScroll>
    );
};

export default Header;
