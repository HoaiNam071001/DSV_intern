import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    homePageUnloaded,
    changeTab,
} from '../components/ArticlesList/articleListSlice';
import { selectIsAuthenticated } from '../components/Auth/authSlice';

import Tabhome from '../components/Home/tabcontrol';
import ArticleList from '../components/ArticlesList/articleList';
import TagsSidebar from '../components/Tags/tagsSideBar';

const Home = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        const fetchArticles = dispatch(
            changeTab(isAuthenticated ? 'feed' : 'all')
        );
        return () => {
            dispatch(homePageUnloaded());
            fetchArticles.abort();
        };
    }, [dispatch, isAuthenticated]);
    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-sm-12 col-lg-9">
                    <Tabhome />
                    <ArticleList />
                </div>
                <div className="col-sm-auto col-lg-3">
                    <TagsSidebar />
                </div>
            </div>
        </div>
    );
};

export default Home;
