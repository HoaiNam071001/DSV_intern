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
            <div className="p-1 px-4">
                <Link
                    to="/"
                    className="p-2 fs-4 rounded-pill fw-semibold link-nodecoration"
                >
                    Home
                </Link>
            </div>
            <div className="p-1 px-4">
                <Link
                    to="/editor"
                    className="p-2 btn btn-outline-primary rounded-pill"
                >
                    New Article
                </Link>
            </div>
            <div className="p-1">
                <div
                    className="nav-link d-flex align-items-center"
                    role="button"
                    data-bs-toggle="dropdown"
                >
                    <img
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
                    <li>
                        <Link
                            to={`/@${currentUser?.username}`}
                            className="dropdown-item"
                        >
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className="dropdown-item">
                            Settings
                        </Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={LogOutUser}>
                            LogOut
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
                <Link
                    to="/login"
                    className="p-1 px-2 btn btn-outline-primary rounded-pill"
                >
                    Sign in
                </Link>
            </div>
            <div className="p-1 px-3">
                <Link
                    to="/register"
                    className="p-1 px-2 btn btn-outline-primary rounded-pill"
                >
                    Sign up
                </Link>
            </div>
        </React.Fragment>
    );
};
const Header = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
        <nav className="bg-light shadow-sm">
            <div className="container">
                <div className="row">
                    <div className="col align-items-center">
                        <Link
                            to="/"
                            className="navbar-brand text-primary px-4 fs-2 fw-bolder"
                        >
                            Blog
                        </Link>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        {isAuthenticated ? <HeaderLogin /> : <HeaderLogout />}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
