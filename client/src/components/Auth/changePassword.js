import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading } from './authSlice';

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

export default ChangePassword;
