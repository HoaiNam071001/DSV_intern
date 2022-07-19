import React, { useEffect } from 'react';
import Box from '@mui/material/Box';

import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    login,
    register,
    selectErrors,
    selectIsLoading,
    selectIsAuthenticated,
    translate,
} from '../../redux/reducers/authSlice';
import Message from '../Message';
import { Input, InputPassword } from './input';
import { initSignUp, initSignIn, objSignUp, objSignIn } from './value';

const Auth = ({ isRegister }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errors = useSelector(selectErrors);
    const inProgress = useSelector(selectIsLoading);
    const isSuccess = useSelector(selectIsAuthenticated);
    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess, navigate]);

    useEffect(() => () => dispatch(translate()), [dispatch]);
    return (
        <div className="container sign-in_up">
            <div className="row col-md-8 offset-md-2 col-lg-6 offset-lg-3  col-xs-12 shadow-lg bg-body rounded">
                <div className="my-3 text-center">
                    <h1 className="text-xs-center mb-3">{isRegister ? 'Sign Up' : 'Sign In'}</h1>
                </div>
                <div className="px-4">
                    <Formik
                        initialValues={isRegister ? initSignUp : initSignIn}
                        validationSchema={isRegister ? objSignUp : objSignIn}
                        onSubmit={(values, { setSubmitting }) => {
                            dispatch(
                                isRegister
                                    ? register({
                                          username: values.username,
                                          email: values.email,
                                          password: values.password,
                                      })
                                    : login({ email: values.email, password: values.password })
                            );
                            setSubmitting(true);
                        }}
                    >
                        <Form className="text-center">
                            <Box
                                sx={{
                                    '& .MuiTextField-root': { my: 2, width: '100%' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                {isRegister && (
                                    <Input
                                        label="Username"
                                        name="username"
                                        type="text"
                                        placeholder="Enter my username"
                                    />
                                )}
                                <Input
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="admin@gmail.com"
                                />

                                <InputPassword
                                    label="Password"
                                    name="password"
                                    placeholder="Enter my password"
                                />
                                {isRegister && (
                                    <InputPassword
                                        label="Confirm Password"
                                        name="repassword"
                                        placeholder="Enter my password"
                                    />
                                )}
                            </Box>

                            <button
                                type="submit"
                                className={`btn-submit-sign ${inProgress ? 'btn-disabled' : ''}`}
                                disabled={inProgress}
                            >
                                {inProgress && (
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                )}

                                {isRegister ? 'Sign Up' : 'Sign In'}
                            </button>
                        </Form>
                    </Formik>
                </div>
                <div className="my-3 text-center">
                    <p className="text-xs-center">
                        {isRegister ? (
                            <Link to="/login">Have an account?' </Link>
                        ) : (
                            <Link to="/register">Need an account?</Link>
                        )}
                    </p>
                    <Message messagess={errors} />
                </div>
            </div>
        </div>
    );
};

export default Auth;
