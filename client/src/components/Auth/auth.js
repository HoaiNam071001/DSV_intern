import React, { useState, useRef, useEffect } from 'react';
import {
    login,
    register,
    selectErrors,
    selectIsLoading,
    selectIsAuthenticated,
    translate,
} from '../../redux/reducers/authSlice';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../Message';
import isEmail from 'validator/lib/isEmail';

const Auth = ({ isRegister }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errors = useSelector(selectErrors);
    const inProgress = useSelector(selectIsLoading);
    const isSuccess = useSelector(selectIsAuthenticated);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const _username = useRef(null);
    const _email = useRef(null);
    const _password = useRef(null);

    const CheckUsername = (e) => {
        if (!isRegister) return true;
        if (username === '') {
            _username.current.classList.remove('valid');
            _username.current.classList.add('not-valid');
            return false;
        }
        _username.current.classList.remove('not-valid');
        _username.current.classList.add('valid');
        return true;
    };
    const CheckEmail = (e) => {
        if (!isEmail(email)) {
            _email.current.classList.remove('valid');
            _email.current.classList.add('not-valid');
            return false;
        }
        _email.current.classList.remove('not-valid');
        _email.current.classList.add('valid');
        return true;
    };
    const CheckPassword = (e) => {
        if (password === '') {
            _password.current.classList.remove('valid');
            _password.current.classList.add('not-valid');
            return false;
        }
        _password.current.classList.remove('not-valid');
        _password.current.classList.add('valid');
        return true;
    };

    const authenticateUser = async (event) => {
        event.preventDefault();
        if (!CheckUsername()) {
            _username.current.focus();
            return;
        }
        if (!CheckEmail()) {
            _email.current.focus();
            return;
        }
        if (!CheckPassword()) {
            _password.current.focus();
            return;
        }
        dispatch(isRegister ? register({ username, email, password }) : login({ email, password }));
    };
    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess, navigate]);

    useEffect(() => () => dispatch(translate()), [dispatch]);
    return (
        <div className="container">
            <div className="row col-md-6 offset-md-3 col-xs-12 shadow-lg bg-body rounded">
                <div className="my-3 text-center">
                    <h1 className="text-xs-center mb-3">{isRegister ? 'Sign Up' : 'Sign In'}</h1>
                </div>
                <div className="px-4" disabled={inProgress}>
                    <Message messagess={errors} />

                    {isRegister ? (
                        <div className="form-floating mb-4">
                            <input
                                ref={_username}
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="User Name"
                                value={username}
                                onBlur={CheckUsername}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="floatingInput">User Name</label>
                        </div>
                    ) : null}

                    <div className="form-floating mb-4">
                        <input
                            ref={_email}
                            type="email"
                            className="form-control"
                            id="floatingEmail"
                            placeholder="name@example.com"
                            value={email}
                            onBlur={CheckEmail}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating mb-5">
                        <input
                            ref={_password}
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            value={password}
                            onBlur={CheckPassword}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary btn-lg col-6 mx-auto" onClick={authenticateUser}>
                        {isRegister ? 'Sign Up' : 'Sign in'}
                    </button>
                </div>

                <div className="my-3 text-center">
                    <p className="text-xs-center">
                        {isRegister ? (
                            <Link to="/login">Have an account?' </Link>
                        ) : (
                            <Link to="/register">Need an account?</Link>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
