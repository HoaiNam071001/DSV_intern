import React from 'react';
import { Link } from 'react-router-dom';

import { selectUser } from './Auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, logout } from './Auth/authSlice';
import { useNavigate } from 'react-router';

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
            <div className="p-2">
                <Link
                    to="/editor"
                    className="d-flex align-items-center new-article-header"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-calendar2-plus m-1"
                        viewBox="0 0 16 16"
                    >
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                        <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM8 8a.5.5 0 0 1 .5.5V10H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V11H6a.5.5 0 0 1 0-1h1.5V8.5A.5.5 0 0 1 8 8z" />
                    </svg>
                    New
                </Link>
            </div>

            <div className="p-2">
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
                        src={
                            currentUser.image ||
                            require('../Assets/avatar-thumbnail.jpg')
                        }
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
                                src={
                                    currentUser.image ||
                                    require('../Assets/avatar-thumbnail.jpg')
                                }
                            />
                            <span className="p-1 ">
                                {currentUser?.username}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className="dropdown-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-gear"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                            </svg>
                            <span className="p-1 ">Settings</span>
                        </Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={LogOutUser}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-box-arrow-right"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                                />
                            </svg>
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
            <div className="p-1">
                <Link to="/login" className="p-1 px-2 home-article-header">
                    Sign in
                </Link>
            </div>
            <div className="p-1">
                <Link to="/register" className="p-1 px-2 home-article-header">
                    Sign up
                </Link>
            </div>
        </React.Fragment>
    );
};

const Header = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return (
        <nav className="header-container">
            <div className="container">
                <div className="row">
                    <div className="col d-flex align-items-center">
                        <Link to="/" className="navbar-brand fs-2 fw-bolder">
                            Blog
                        </Link>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <div className="p-2 px-2">
                            <Link to="/" className="home-article-header">
                                Home
                            </Link>
                        </div>
                        {isAuthenticated ? <HeaderLogin /> : <HeaderLogout />}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
