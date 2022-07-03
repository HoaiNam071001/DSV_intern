import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading } from './authSlice';
import isEmail from 'validator/lib/isEmail';

const ChangeProfile = ({ currentUser, onSaveSettings }) => {
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
};
export default ChangeProfile;
