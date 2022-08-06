import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Video from './components/VideoCall/video';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, selectIsAuthenticated } from './redux/reducers/authSlice';
import { setAuthorization } from './Services/Axios';
import App from './App';

function Router() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    if (window.localStorage.getItem('jwt') && !isAuthenticated) {
        setAuthorization(window.localStorage.getItem('jwt'));
        dispatch(getUser());
    }

    return (
        <Routes>
            <Route path="/videocall" element={<Video />} />
            <Route path="*" element={<App />} />
        </Routes>
    );
}

export default Router;
