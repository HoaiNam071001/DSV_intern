import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, selectIsAuthenticated } from './components/Auth/authSlice';

import './style/App.css';

const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));
const Home = lazy(() => import('./pages/home'));
const Article = lazy(() => import('./pages/article'));
const Profile = lazy(() => import('./pages/profile'));

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    if (window.localStorage.getItem('jwt') && !isAuthenticated) {
        dispatch(getUser());
    }

    return (
        <React.Fragment>
            <Header />
            <div className="container-app">
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/article/:slug" element={<Article />} />
                        <Route path="/@:slug" element={<Profile />} />
                    </Routes>
                </Suspense>
            </div>
        </React.Fragment>
    );
}

export default App;
