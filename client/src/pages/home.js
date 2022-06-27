import React, { useEffect, useState } from 'react';
import ArticleList from '../components/ArticlesList/articleList';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../components/Auth/authSlice';
import {
    getAllArticles,
    selectByTag,
    homePageUnloaded,
} from '../components/ArticlesList/articleListSlice';
import TagsSidebar from '../components/Tags/tagsSideBar';
const Home = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const tag = useSelector(selectByTag);

    const [feed, setfeed] = useState(isAuthenticated ? 0 : 1);

    useEffect(() => {
        if (feed === 0 || feed === 1) dispatch(getAllArticles(feed));
    }, [dispatch, feed]);

    useEffect(() => {
        if (tag) setfeed(2);
    }, [tag]);

    useEffect(() => () => dispatch(homePageUnloaded()), [dispatch]);

    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-sm-12 col-lg-9">
                    <div className="row d-flex tab-home-head">
                        {isAuthenticated ? (
                            <div className="col-6 col-md-4 col-lg-3 col-sm-4">
                                <button
                                    className={`btn-home-title rounded-pill m-1 ${
                                        tag
                                            ? ''
                                            : feed === 0
                                            ? 'btn-home-title-active'
                                            : ''
                                    }`}
                                    onClick={() => setfeed(0)}
                                >
                                    Your Feed
                                </button>
                            </div>
                        ) : null}

                        <div className="col-6 col-md-4 col-lg-3 col-sm-4">
                            <button
                                className={`btn-home-title rounded-pill  m-1 ${
                                    tag
                                        ? ''
                                        : feed === 1
                                        ? 'btn-home-title-active'
                                        : ''
                                }`}
                                onClick={() => setfeed(1)}
                            >
                                Global Feed
                            </button>
                        </div>

                        {tag ? (
                            <div className="col-auto">
                                <button
                                    className={`btn-home-title rounded-pill  m-1 ${
                                        tag ? 'btn-home-title-active' : ''
                                    }`}
                                >
                                    #{tag}
                                </button>
                            </div>
                        ) : null}
                    </div>
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
