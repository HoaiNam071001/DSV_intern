import React, { useEffect, useState } from 'react';
import ArticleList from '../components/ArticlesList/articleList';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../components/Auth/authSlice';
import {
    getAllArticles,
    selectByTag,
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
    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-sm-12 col-lg-9">
                    <div className="row d-flex">
                        {isAuthenticated ? (
                            <div className="col-4 col-lg-3 col-sm-4">
                                <button
                                    className="btn-home-title"
                                    onClick={() => setfeed(0)}
                                >
                                    Your Feed
                                </button>
                                <hr
                                    id="hrYourFeed"
                                    className={
                                        'hr-bottom-hometitle ' +
                                        (tag
                                            ? ''
                                            : feed === 0
                                            ? 'hr-active'
                                            : '')
                                    }
                                />
                            </div>
                        ) : null}

                        <div className="col-4 col-lg-3 col-sm-4">
                            <button
                                className="btn-home-title"
                                onClick={() => setfeed(1)}
                            >
                                Global Feed
                            </button>
                            <hr
                                id="hrGlobalFeed"
                                className={
                                    'hr-bottom-hometitle ' +
                                    (tag ? '' : feed === 1 ? 'hr-active' : '')
                                }
                            />
                        </div>
                        {tag ? (
                            <div className="col-4 col-lg-3 col-sm-4">
                                <button className="btn-home-title">
                                    #{tag}
                                </button>
                                <hr
                                    id="hrGlobalFeed"
                                    className={
                                        'hr-bottom-hometitle ' +
                                        (tag ? 'hr-active' : '')
                                    }
                                />
                            </div>
                        ) : null}

                        <hr className="hr-bottom" />
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
