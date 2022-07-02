import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, selectIsAuthenticated } from './components/Auth/authSlice';
import './style/App.css';
import { setAuthorization } from './Services/Axios';

const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));
const Settings = lazy(() => import('./pages/settings'));
const Home = lazy(() => import('./pages/home'));
const Article = lazy(() => import('./pages/article'));
const Profile = lazy(() => import('./pages/profile'));
const EditArticle = lazy(() => import('./pages/edit'));

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    if (window.localStorage.getItem('jwt') && !isAuthenticated) {
        setAuthorization(window.localStorage.getItem('jwt'));
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
                        <Route path="/settings" element={<Settings />} />
                        <Route
                            path="/setpassword"
                            element={<Settings isPassword />}
                        />
                        <Route path="/article/:slug" element={<Article />} />
                        <Route path="/@:username" element={<Profile />} />
                        <Route
                            path="/@:username/favorites"
                            element={<Profile isFavoritePage />}
                        />
                        <Route path="/editor" element={<EditArticle />} />
                        <Route path="/editor/:slug" element={<EditArticle />} />
                    </Routes>
                </Suspense>
            </div>
        </React.Fragment>
    );
}

export default App;
