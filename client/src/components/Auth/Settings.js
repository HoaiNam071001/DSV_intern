import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Toast from '../Toast';
import ListErrors from '../ListErrors';
import {
    selectErrors,
    selectIsAuthenticated,
    selectIsLoading,
    selectUser,
    updateUser,
    selectIsSuccessUpdate,
    setIdle,
} from './authSlice';

function SettingsForm({ currentUser, onSaveSettings, isdisable }) {
    const [image, setImage] = useState(
        currentUser?.image ??
            'https://static.productionready.io/images/smiley-cyrus.jpg'
    );
    const [username, setUsername] = useState(currentUser?.username ?? '');
    const [bio, setBio] = useState(currentUser?.bio ?? '');
    const [email, setEmail] = useState(currentUser?.email ?? '');
    const [password, setPassword] = useState('');
    const isLoading = useSelector(selectIsLoading);
    const saveSettings = (e) => {
        e.preventDefault();
        const user = {
            image,
            username,
            bio,
            email,
        };
        if (password) {
            user.password = password;
        }
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
                    type="text"
                    className="form-control"
                    id="floatingusername"
                    value={username}
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
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingEmail">Email</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingpassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingpassword">Password</label>
            </div>

            <button
                className="btn btn-outline-primary float-end"
                type="submit"
                onClick={saveSettings}
                disabled={isdisable}
            >
                Update Settings
            </button>
        </div>
    );
}

function Settings() {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);
    const errors = useSelector(selectErrors);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isSuccess = useSelector(selectIsSuccessUpdate);
    const [toast, setToast] = useState(false);
    const Navigate = useNavigate();
    const saveSettings = (user) => {
        dispatch(updateUser(user));
    };
    useEffect(() => {
        if (isSuccess) {
            setToast(true);
            setTimeout(() => setToast(false), 4000);
        }
    }, [isSuccess, dispatch]);
    if (!isAuthenticated) {
        Navigate('/');
    }
    useEffect(() => () => dispatch(setIdle()), [dispatch]);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 col-12">
                    {toast && <Toast setToast={setToast} />}

                    <h1 className="text-center">Your Settings</h1>
                    <ListErrors errors={errors} />

                    <SettingsForm
                        currentUser={currentUser}
                        onSaveSettings={saveSettings}
                        isdisable={toast}
                    />
                </div>
            </div>
        </div>
    );
}

export default Settings;
