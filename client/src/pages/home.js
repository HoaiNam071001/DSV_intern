import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homePageUnloaded, changeTab } from '../redux/reducers/articleListSlice';
import { selectIsAuthenticated } from '../redux/reducers/authSlice';

import Tabhome from '../components/Home/tabcontrol';
import ArticleList from '../components/ArticlesList/articleList';
import TagsSidebar from '../components/Home/tagsSideBar';

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
            <div className="init-web">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5 offset-sm-7 col-md-6 offset-md-6 col-12">Blog</div>
                    </div>
                </div>
            </div>
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
        </>
    );
};

export default Home;
