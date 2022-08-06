import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteArticle, unfavoriteArticle } from '../../redux/reducers/articleListSlice';
import { selectUser } from '../../redux/reducers/authSlice';
import FavoriteIconActive from '@mui/icons-material/Favorite';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';
import Avatar from '@mui/material/Avatar';
const ThumnailArticle = require('../../Assets/blog.jpg');
const Avt = require('../../Assets/avatar-thumbnail.jpg');
const Favorite = ({ article }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(selectUser);

    const handleClick = (event) => {
        event.preventDefault();
        if (!currentUser) return navigate(`/login`);
        if (article.favorited) dispatch(unfavoriteArticle(article.slug));
        else dispatch(favoriteArticle(article.slug));
    };
    return (
        <div className="d-flex align-items-center">
            <Tooltip title="Like this article" placement="top" arrow>
                <button onClick={handleClick}>
                    {article.favorited ? (
                        <FavoriteIconActive className="btn-favorate" />
                    ) : (
                        <FavoriteIcon className="btn-favorate" />
                    )}
                </button>
            </Tooltip>
            <div className="text-truncate">
                {article.favoritesCount} {Number(article.favoritesCount) > 1 ? 'Likes' : 'Like'}
            </div>
        </div>
    );
};

const ArticleItem = ({ article }) => {
    return (
        <>
            <div key={article.slug} className="feed-item">
                <div className="row">
                    <div className="col-4 col-xl-3 thumnail-article">
                        <Avatar alt="thumnail-article" src={article.thumbnail}>
                            <img alt="thumnail-article" src={ThumnailArticle} />
                        </Avatar>
                    </div>
                    <div className="col-12 col-sm-8 col-xl-9 feed-content">
                        <div className="item-author d-flex align-items-center">
                            <Link
                                to={`/@${article.author.username}`}
                                className="d-flex align-items-center"
                            >
                                <Avatar alt="author" src={article.author.image}>
                                    <img alt="author" src={Avt} />
                                </Avatar>
                            </Link>
                            <div className="item-author-z">
                                <Link
                                    to={`/@${article.author.username}`}
                                    className="item-author-name text-truncate"
                                >
                                    {article.author.username}
                                </Link>

                                <div className="item-author-date">
                                    <Tooltip
                                        title={`createdAt:${dayjs(article.createdAt).format(
                                            'DD/MM/YYYY HH:mm'
                                        )} \n updatedAt: ${dayjs(article.updatedAt).format(
                                            'DD/MM/YYYY HH:mm'
                                        )}
                                    `}
                                        placement="top"
                                        arrow
                                    >
                                        <time dateTime={article.createdAt}>
                                            {dayjs(article.createdAt).format('DD/MM/YYYY HH:mm')}
                                        </time>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>

                        <Link to={`/article/${article.slug}`} className="link-nodecoration">
                            <Tooltip title={article.title} placement="top" followCursor arrow>
                                <div className="item-title text-truncate">{article.title}</div>
                            </Tooltip>
                            <div className="item-content text-truncate">{article.description}</div>
                        </Link>
                        <div className="row">
                            <div className="col-4 col-sm-3 favorited d-flex align-items-center">
                                <Favorite article={article} />
                            </div>
                            <div className="col-8 col-sm-9 d-flex align-items-center justify-content-end">
                                {article.tagList.map((tag) => (
                                    <span
                                        key={tag}
                                        className="p-1 bg-light m-1 rounded-pill border text-truncate"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArticleItem;
