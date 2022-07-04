import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/reducers/authSlice';
import { selectByTag, changeTab } from '../../redux/reducers/articleListSlice';

const Feed = () => {
    const dispatch = useDispatch();
    const currentTab = useSelector((state) => state.articleList.tab);

    const ChangeTab = () => {
        dispatch(changeTab('feed'));
    };

    return (
        <div className="col-6 col-md-4 col-lg-3 col-sm-4">
            <button
                className={`btn-home-title rounded-pill m-1 ${currentTab === 'feed' && 'btn-home-title-active'}`}
                onClick={ChangeTab}
            >
                Your Feed
            </button>
        </div>
    );
};

const Global = () => {
    const dispatch = useDispatch();
    const currentTab = useSelector((state) => state.articleList.tab);

    const ChangeTab = () => {
        dispatch(changeTab('all'));
    };
    return (
        <div className="col-6 col-md-4 col-lg-3 col-sm-4">
            <button
                className={`btn-home-title rounded-pill m-1 ${currentTab === 'all' && 'btn-home-title-active'}`}
                onClick={ChangeTab}
            >
                Global Feed
            </button>
        </div>
    );
};

const Tag = () => {
    const tag = useSelector(selectByTag);
    return (
        <div className="col-auto">
            {tag && <button className="btn-home-title rounded-pill m-1 btn-home-title-active">#{tag}</button>}
        </div>
    );
};
const Tabhome = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return (
        <div className="row d-flex tab-home-head">
            {isAuthenticated && <Feed />}
            <Global />
            <Tag />
        </div>
    );
};

export default memo(Tabhome);
