import React from 'react';
import { Link } from 'react-router-dom';

const NavLogout = () => {
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
export default NavLogout;
