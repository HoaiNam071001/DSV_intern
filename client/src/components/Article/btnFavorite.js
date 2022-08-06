import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { favorite, unfavorite } from '../../redux/reducers/articleSlice';
import { selectIsAuthenticated } from '../../redux/reducers/authSlice';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIconActive from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavoriteArticle = ({ slug, favorited, count }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const handleClickFavorite = () => {
        if (!slug || !isAuthenticated) return navigate(`/login`);
        if (favorited) dispatch(unfavorite(slug));
        else dispatch(favorite(slug));
    };
    return (
        <Tooltip title={`${favorited ? 'Dislike' : 'Like'} this article`} placement="top" arrow>
            <button className="btn-favorite-article text-truncate" onClick={handleClickFavorite}>
                {favorited ? <FavoriteIconActive /> : <FavoriteBorderIcon />}
                <div>
                    &nbsp;{count}&nbsp;{Number(count) > 1 ? 'Likes' : 'Like'}
                </div>
            </button>
        </Tooltip>
    );
};

export default FavoriteArticle;
