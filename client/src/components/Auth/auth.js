import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../Message';
import Form, { Input, InputPassword } from './form';
import { initSignUp, initSignIn, objSignUp, objSignIn } from './value';
import {
    login,
    register,
    translate,
    selectErrors,
    selectIsLoading,
    selectIsAuthenticated,
} from '../../redux/reducers/authSlice';

const Auth = ({ isRegister }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errors = useSelector(selectErrors);
    const inProgress = useSelector(selectIsLoading);
    const isSuccess = useSelector(selectIsAuthenticated);
    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess, navigate]);
    const submission = (values) => {
        dispatch(
            isRegister
                ? register({
                      username: values.username,
                      email: values.email,
                      password: values.password,
                  })
                : login({ email: values.email, password: values.password })
        );
    };
    useEffect(() => () => dispatch(translate()), [dispatch]);
    return (
        <div className="container sign-in_up">
            <div className="row col-md-8 offset-md-2 col-lg-6 offset-lg-3  col-xs-12 shadow-lg bg-body rounded">
                <div className="my-3 text-center">
                    <h1 className="text-xs-center mb-3">{isRegister ? 'Sign Up' : 'Sign In'}</h1>
                </div>
                <div className="px-4 ">
                    <Message messagess={errors} />

                    <Formik
                        initialValues={isRegister ? initSignUp : initSignIn}
                        validationSchema={isRegister ? objSignUp : objSignIn}
                        onSubmit={(values, { setSubmitting }) => {
                            submission(values);
                            setSubmitting(true);
                        }}
                    >
                        <Form>
                            {isRegister && (
                                <Input
                                    label="Username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter my Username"
                                />
                            )}
                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="Enter my Email"
                            />

                            <InputPassword
                                label="Password"
                                name="password"
                                placeholder="Enter my Password"
                            />
                            {isRegister && (
                                <InputPassword
                                    label="Confirm Password"
                                    name="confirm"
                                    placeholder="Enter my Password"
                                />
                            )}
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
                <p className="text-xs-center text-center p-3">
                    {isRegister ? (
                        <>
                            Have an account? <Link to="/login">Sign in</Link>
                        </>
                    ) : (
                        <>
                            Need an account? <Link to="/register">Sign up</Link>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Auth;
