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
        <React.Fragment>
            <div className="p-1 px-3">
                <Link
                    to="/editor"
                    className="p-2 btn btn-outline-primary rounded-pill"
                >
                    New Article
                </Link>
            </div>
            <div className="p-1">
                <div
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                >
                    {currentUser?.username}
                </div>
                <ul className="dropdown-menu">
                    <li>
                        <Link
                            to={`/@${currentUser?.username}`}
                            className="dropdown-item"
                        >
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/changepassword" className="dropdown-item">
                            Change Password
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
        </React.Fragment>
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
