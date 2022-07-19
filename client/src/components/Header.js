import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, logout, selectUser } from '../redux/reducers/authSlice';
import { useNavigate, useLocation } from 'react-router';

const HeaderLogin = ({ location }) => {
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const LogOutUser = () => {
        dispatch(logout());
        navigate('/');
    };
    return (
        <>
            <Link
                to="/editor"
                className={`mx-2 btn-header d-flex align-items-center justify-content-center ${
                    location === '/editor' ? 'btn-active-in' : ''
                }`}
                title="New article"
            >
                <i className="bi bi-plus-circle fs-5"></i>
            </Link>
            <Link
                to="/messages"
                className={`mx-2 btn-header d-flex align-items-center justify-content-center ${
                    location === '/messages' ? 'btn-active-in' : ''
                }`}
                title="messages"
            >
                <i className="bi bi-messenger fs-5"></i>
            </Link>

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

const HeaderLogout = ({ location }) => {
    return (
        <React.Fragment>
            <Link
                to="/login"
                className={`sign-header ${location === '/login' ? 'btn-active-out' : ''}`}
            >
                Sign in
            </Link>
            <Link
                to="/register"
                className={`sign-header ${location === '/register' ? 'btn-active-out' : ''}`}
            >
                Sign up
            </Link>
        </React.Fragment>
    );
};

const Header = () => {
    const location = useLocation().pathname;
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return (
        <nav className="header-container">
            <div className="container">
                <div className="row">
                    <div className="col d-flex align-items-center">
                        <Link to="/" className="title-header navbar-brand fs-2 fw-bolder">
                            <img src={require('../Assets/logo.png')} alt="Blog" />
                        </Link>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <Link
                            to="/"
                            className={`mx-2 btn-header d-flex align-items-center justify-content-center ${
                                location === '/' ? 'btn-active-in' : ''
                            }`}
                            title="home"
                        >
                            <i className="bi bi-house-fill fs-5"></i>
                        </Link>
                        {isAuthenticated ? (
                            <HeaderLogin location={location} />
                        ) : (
                            <HeaderLogout location={location} />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
