import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/reducers/authSlice';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import NavLogin from './navin';
import NavLogout from './navout';

const ElevationScroll = (props) => {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });
    return React.cloneElement(children, {
        className: trigger ? 'header-container' : 'header-scroll header-container',
    });
};

const Header = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return (
        <ElevationScroll>
            <nav className="header-container">
                <div className="container">
                    <div className="row">
                        <div className="col-3 col-sm-5 d-flex align-items-center">
                            <Link to="/" className="title-header navbar-brand fs-2 fw-bolder m-1">
                                <img src={require('../../Assets/logo.png')} alt="Blog" />
                            </Link>
                        </div>
                        <div className="col-9 col-sm-7 d-flex justify-content-end align-items-center">
                            <Tooltip title="HomePage" placement="bottom" arrow>
                                <Link
                                    to="/"
                                    className="mx-3 btn-header d-flex align-items-center justify-content-center"
                                >
                                    <i className="bi bi-house-fill fs-3"></i>
                                </Link>
                            </Tooltip>

                            {isAuthenticated ? <NavLogin /> : <NavLogout />}
                        </div>
                    </div>
                </div>
            </nav>
        </ElevationScroll>
    );
};

export default Header;
