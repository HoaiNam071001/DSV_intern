import React from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';
import FavoriteIconActive from '@mui/icons-material/Favorite';

import { follow, unfollow, favorite, unfavorite } from '../../redux/reducers/articleSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const InteractArticle = ({ username, following, slug, favorited, count }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickFollow = () => {
        if (!username) {
            navigate(`/login`);
            return;
        }

        if (following) {
            dispatch(unfollow({ username }));
        } else {
            dispatch(follow({ username }));
        }
    };

    const handleClickFavorite = () => {
        if (!slug || !username) {
            navigate(`/login`);
            return;
        }

        if (favorited) {
            dispatch(unfavorite(slug));
        } else {
            dispatch(favorite(slug));
        }
    };
    return (
        <div className="d-flex align-items-center mx-1">
            <button
                className={`d-flex align-items-center btn-article btn-follow-article ${
                    following ? 'btn-follow-article-active' : ''
                }`}
                onClick={handleClickFollow}
            >
                <AddTaskIcon />
                {following ? 'Unfollow' : 'Follow'}
            </button>

            <button
                className={`d-flex align-items-center justify-content-center  btn-article btn-favorite-article ${
                    favorited ? 'btn-favorite-article-active' : ''
                }`}
                onClick={handleClickFavorite}
            >
                <FavoriteIconActive />
                <div>{count}</div>
            </button>
        </div>
    );
};

export default InteractArticle;
