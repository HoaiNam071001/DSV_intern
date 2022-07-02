import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Message from '../Message';
import {
    selectErrors,
    selectIsAuthenticated,
    selectIsLoading,
    selectUser,
    updateUser,
    selectIsSuccessUpdate,
    setIdle,
} from './authSlice';
import isEmail from 'validator/lib/isEmail';

const ChangePassword = ({ onSaveSettings }) => {
    const isLoading = useSelector(selectIsLoading);
    const [oldpassword, setOldpassword] = useState('');
    const [password, setPassword] = useState('');
    const _oldpass = useRef(null);
    const _pass = useRef(null);
    const _repass = useRef(null);
    const [repassword, setrePassword] = useState('');
    const [err, setErr] = useState('');
    const checkpassword = () => {
        if (oldpassword.length === 0) {
            _oldpass.current.focus();
            setErr("Old password can't be blank");
            return false;
        } else if (password.length === 0) {
            _pass.current.focus();
            setErr("New password can't be blank");
            return false;
        } else if (password !== repassword) {
            _pass.current.focus();
            setErr('different passwords');
            return false;
        }
        return true;
    };
    const saveSettings = (e) => {
        if (!checkpassword()) return;
        e.preventDefault();
        const user = {
            password,
            oldpassword,
        };
        onSaveSettings(user);
    };
    return (
        <div disabled={isLoading}>
            <div className="form-floating mb-3">
                <input
                    ref={_oldpass}
                    type="password"
                    className={`form-control`}
                    id="floatingoldpassword"
                    placeholder="Enter old password"
                    value={oldpassword}
                    onChange={(e) => setOldpassword(e.target.value)}
                />
                <label htmlFor="floatingoldpassword"> Old Password</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    ref={_pass}
                    type="password"
                    className={`form-control`}
                    id="floatingpassword"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingpassword">Password </label>
            </div>
            <div className="form-floating mb-3">
                <input
                    ref={_repass}
                    type="password"
                    className={`form-control`}
                    id="floatingrepassword"
                    value={repassword}
                    placeholder="Enter new password"
                    onChange={(e) => setrePassword(e.target.value)}
                />
                <label htmlFor="floatingrepassword">Password again</label>
            </div>
            <div className="err-message-password">{err}</div>
            <button
                className="btn btn-outline-primary btn-update-settings float-end"
                type="submit"
                onClick={saveSettings}
            >
                Update Password
            </button>
        </div>
    );
};

function ChangePfrofile({ currentUser, onSaveSettings }) {
    const [image, setImage] = useState(currentUser?.image ?? '');
    const [username, setUsername] = useState(currentUser?.username ?? '');
    const [bio, setBio] = useState(currentUser?.bio ?? '');
    const [email, setEmail] = useState(currentUser?.email ?? '');
    const isLoading = useSelector(selectIsLoading);
    const _email = useRef(null);
    const _username = useRef(null);
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
    const CheckUsername = (e) => {
        if (username === '') {
            _username.current.classList.remove('valid');
            _username.current.classList.add('not-valid');
            return false;
        }
        _username.current.classList.remove('not-valid');
        _username.current.classList.add('valid');
        return true;
    };

    const saveSettings = (e) => {
        if (!CheckUsername()) {
            _username.current.focus();
            return;
        }
        if (!CheckEmail()) {
            _email.current.focus();
            return;
        }
        e.preventDefault();
        const user = {
            image,
            username,
            bio,
            email,
        };
        onSaveSettings(user);
    };
    return (
        <div disabled={isLoading}>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingimg"
                    placeholder="name@example.com"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <label htmlFor="floatingimg">URL of profile picture</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    ref={_username}
                    type="text"
                    className="form-control"
                    id="floatingusername"
                    value={username}
                    onBlur={CheckUsername}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="floatingusername">User Name</label>
            </div>

            <div className="form-floating mb-3">
                <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingBio"
                    style={{ height: '150px' }}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <label htmlFor="floatingBio">Short Bio about you</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    ref={_email}
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    value={email}
                    onBlur={CheckEmail}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingEmail">Email</label>
            </div>

            <button
                className="btn btn-outline-primary float-end btn-update-settings"
                type="submit"
                onClick={saveSettings}
            >
                Update Profile
            </button>
        </div>
    );
}

function Settings({ isPassword }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);
    const errors = useSelector(selectErrors);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isSuccess = useSelector(selectIsSuccessUpdate);
    const Navigate = useNavigate();
    const saveSettings = (user) => {
        dispatch(updateUser(user));
    };
    if (!isAuthenticated) {
        Navigate('/');
    }
    useEffect(() => {
        dispatch(setIdle());
    }, [isPassword, dispatch]);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 col-12">
                    <h1 className="text-center p-3">
                        {isPassword
                            ? 'Change Your Password'
                            : 'Settings Your Profile'}
                    </h1>
                    {errors && <Message messagess={errors} />}
                    {isSuccess && (
                        <Message
                            messagess={{ Updated: ['Success'] }}
                            state={'success'}
                        />
                    )}

                    {isPassword ? (
                        <ChangePassword onSaveSettings={saveSettings} />
                    ) : (
                        <ChangePfrofile
                            currentUser={currentUser}
                            onSaveSettings={saveSettings}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;
