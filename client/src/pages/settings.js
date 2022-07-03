//import SettingsComponent from '../components/Auth/Settings';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Message from '../components/Message';
import ChangePassword from '../components/Auth/changePassword';
import ChangeProfile from '../components/Auth/changeProfile';
import {
    selectErrors,
    selectIsAuthenticated,
    selectUser,
    updateUser,
    selectIsSuccessUpdate,
    setIdle,
} from '../redux/reducers/authSlice';

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
                    <h1 className="text-center p-3">{isPassword ? 'Change Your Password' : 'Settings Your Profile'}</h1>
                    {errors && <Message messagess={errors} />}
                    {isSuccess && <Message messagess={{ Updated: ['Success'] }} state={'success'} />}

                    {isPassword ? (
                        <ChangePassword onSaveSettings={saveSettings} />
                    ) : (
                        <ChangeProfile currentUser={currentUser} onSaveSettings={saveSettings} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;
