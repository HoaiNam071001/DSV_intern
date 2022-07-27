import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Video from './components/VideoCall/video';

import App from './App';

function Router() {
    return (
        <Routes>
            <Route path="/videocall" element={<Video />} />
            <Route path="*" element={<App />} />
        </Routes>
    );
}

export default Router;
