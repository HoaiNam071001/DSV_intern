//import SettingsComponent from '../components/Auth/Settings';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Message from '../components/Message';
import ChangePassword from '../components/Auth/changePassword';
import ChangeProfile from '../components/Auth/changeProfile';
import {
    selectErrors,
    selectUser,
    updateUser,
    selectIsSuccessUpdate,
    setIdle,
} from '../redux/reducers/authSlice';
function Settings({ isPassword }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);
    const errors = useSelector(selectErrors);
    const isSuccess = useSelector(selectIsSuccessUpdate);
    const navigate = useNavigate();
    const saveSettings = (user) => {
        dispatch(updateUser(user));
    };
    useEffect(() => {
        if (!currentUser) return navigate('/');
    }, [navigate, currentUser]);

    useEffect(() => {
        dispatch(setIdle());
    }, [isPassword, dispatch]);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 col-12 container-settings">
                    <h1 className="p-3 d-flex align-items-center justify-content-center">
                        <AdminPanelSettingsIcon className="fs-1" />
                        &nbsp;{isPassword ? 'Change Password' : 'Edit Profile'}
                    </h1>

                    {isPassword ? (
                        <ChangePassword onSaveSettings={saveSettings} />
                    ) : (
                        <ChangeProfile currentUser={currentUser} onSaveSettings={saveSettings} />
                    )}
                    {errors && <Message messagess={errors} />}
                    {isSuccess && (
                        <Message messagess={{ Updated: ['Success'] }} state={'success'} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;
