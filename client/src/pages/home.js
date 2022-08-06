import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homePageUnloaded, changeTab } from '../redux/reducers/articleListSlice';
import { selectIsAuthenticated } from '../redux/reducers/authSlice';

import Tabhome from '../components/Home/tabcontrol';
import ArticleList from '../components/ArticlesList/articleList';
import TagsSidebar from '../components/Home/tagsSideBar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const init = require('../Assets/background.png');
const Home = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        const fetchArticles = dispatch(changeTab(isAuthenticated ? 'feed' : 'all'));
        return () => {
            dispatch(homePageUnloaded());
            fetchArticles.abort();
        };
    }, [dispatch, isAuthenticated]);
    return (
        <>
            <div className="init-web ">
                <div className="container">
                    <div className="row ">
                        <div className="col-sm-6 d-flex justify-content-center align-items-center">
                            <img src={init} alt="background" width="70%" />
                        </div>
                        <div className="col-sm-6 d-flex justify-content-center align-items-center">
                            <div className="tab-init">
                                <div className="title-page">Simple Blog</div>
                                <div className="message">A place to share knowledge</div>
                                <a href="#topscroll">
                                    Let's go <ArrowForwardIosIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="topscroll"></div>
            <div className="container my-3">
                <div className="row">
                    <div className="col-sm-12 col-lg-9 articles-container-home">
                        <Tabhome />
                        <ArticleList />
                    </div>
                    <div className="col-sm-auto col-lg-3">
                        <TagsSidebar />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
