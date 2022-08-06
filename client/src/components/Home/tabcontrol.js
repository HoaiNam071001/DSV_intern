import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/reducers/authSlice';
import { selectByTag, changeTab } from '../../redux/reducers/articleListSlice';
import PublicIcon from '@mui/icons-material/Public';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import SellIcon from '@mui/icons-material/Sell';
const Feed = () => {
    const dispatch = useDispatch();
    const currentTab = useSelector((state) => state.articleList.tab);

    const ChangeTab = () => {
        dispatch(changeTab('feed'));
    };

    return (
        <div className="col-6 col-md-4">
            <button
                className={`btn-home-title ${currentTab === 'feed' && 'btn-home-title-active'}`}
                onClick={ChangeTab}
            >
                <FollowTheSignsIcon />
                &nbsp; Your Feed
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
        <div className="col-6 col-md-4">
            <button
                className={`btn-home-title ${currentTab === 'all' && 'btn-home-title-active'}`}
                onClick={ChangeTab}
            >
                <PublicIcon />
                &nbsp; Global Feed
            </button>
        </div>
    );
};

const Tag = () => {
    const tag = useSelector(selectByTag);
    return (
        <div className="col-12 col-md-4">
            {tag && (
                <button className="btn-home-title btn-home-title-active">
                    <SellIcon /> &nbsp;
                    {tag}
                </button>
            )}
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
