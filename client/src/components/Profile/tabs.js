import React from 'react';
import { Link } from 'react-router-dom';

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
                    My Articles
                </Link>
            </div>
            <div className="col-6 col-lg-3 text-center">
                <Link
                    to={`/@${username}/favorites`}
                    className={`link-nodecoration item-link-profile ${
                        isFavorites ? 'bg-tab-active' : ''
                    }`}
                >
                    My Favorites
                </Link>
            </div>
        </div>
    );
};

export default ProfileTabs;
