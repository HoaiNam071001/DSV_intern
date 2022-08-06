import React from 'react';
import { Link } from 'react-router-dom';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
const ProfileTabs = ({ username, isFavorites }) => {
    return (
        <div className="row nav-link-profile">
            <div className="col-6 col-lg-3 text-center ">
                <Link
                    to={`/@${username}`}
                    className={`link-nodecoration item-link-profile ${
                        !isFavorites ? 'bg-tab-active' : ''
                    }`}
                >
                    <RecentActorsIcon />
                    &nbsp; My Articles
                </Link>
            </div>
            <div className="col-6 col-lg-3 text-center">
                <Link
                    to={`/@${username}/favorites`}
                    className={`link-nodecoration item-link-profile ${
                        isFavorites ? 'bg-tab-active' : ''
                    }`}
                >
                    <ThumbUpIcon />
                    &nbsp;My Favorites
                </Link>
            </div>
        </div>
    );
};

export default ProfileTabs;
