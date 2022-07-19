import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteArticle, unfavoriteArticle } from '../../redux/reducers/articleListSlice';
import { selectUser } from '../../redux/reducers/authSlice';
import FavoriteIconActive from '@mui/icons-material/Favorite';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';

const Favorite = ({ article }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(selectUser);

    const handleClick = (event) => {
        event.preventDefault();
        if (!currentUser) {
            navigate(`/login`);
            return;
        }
        if (article.favorited) {
            dispatch(unfavoriteArticle(article.slug));
        } else {
            dispatch(favoriteArticle(article.slug));
        }
    };
    return (
        <div className="d-flex align-items-center justify-content-center">
            <Tooltip title="Like this article" placement="top" arrow>
                {article.favorited ? (
                    <FavoriteIconActive className="btn-favorate" onClick={handleClick} />
                ) : (
                    <FavoriteIcon onClick={handleClick} className="btn-favorate" />
                )}
            </Tooltip>
            <div className="text-truncate"> {article.favoritesCount} Likes</div>
        </div>
    );
};

const ArticleItem = ({ article }) => {
    return (
        <>
            <div key={article.slug} className="feed-item">
                <div className="row">
                    <div className="col-8 col-sm-10 item-author d-flex align-items-center">
                        <Link to={`/@${article.author.username}`}>
                            <img
                                className="img-thumbnail"
                                src={
                                    article.author.image ||
                                    require('../../Assets/avatar-thumbnail.jpg')
                                }
                                alt="author"
                            />
                        </Link>
                        <div className="col-auto">
                            <Link to={`/@${article.author.username}`} className="item-author-name">
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

                    <div className="col-4 col-sm-2">
                        <Favorite article={article} />
                    </div>

                    <div className="col-12">
                        <Link to={`/article/${article.slug}`} className="link-nodecoration">
                            <div className="item-title text-truncate">{article.title}</div>
                            <div className="item-content text-truncate">{article.description}</div>
                        </Link>
                        <div>
                            {article.tagList.map((tag) => (
                                <span
                                    key={tag}
                                    className="p-1 bg-light m-1 rounded-pill border float-end"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArticleItem;
