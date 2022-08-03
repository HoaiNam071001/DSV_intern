import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, selectIsAuthenticated } from './redux/reducers/authSlice';
import { setAuthorization } from './Services/Axios';
import './style/App.css';

import Header from './components/Header/header';
import Footer from './components/Footer';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Settings from './pages/settings';
import Article from './pages/article';
import Profile from './pages/profile';
import EditArticle from './pages/edit';
import Message from './pages/messenger';
import Search from './pages/search';
import BadRequest from './pages/badRequest';

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
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/setpassword" element={<Settings isPassword />} />
                    <Route path="/article/:slug" element={<Article />} />
                    <Route path="/@:username" element={<Profile />} />
                    <Route path="/@:username/favorites" element={<Profile isFavoritePage />} />
                    <Route path="/editor" element={<EditArticle />} />
                    <Route path="/editor/:slug" element={<EditArticle />} />
                    <Route path="/messages" element={<Message />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/404.json" element={<BadRequest />} />
                </Routes>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default App;
