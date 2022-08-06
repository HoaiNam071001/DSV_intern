import React, { useEffect, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { articlePageUnloaded, getArticle, selectArticle } from '../../redux/reducers/articleSlice';
import { selectUser } from '../../redux/reducers/authSlice';
import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';
import Avatar from '@mui/material/Avatar';
import OptionArticle from './option';
import Follow from './follow';
import Skeleton from './skeletonDetail';
import Favorite from './btnFavorite';
const avt = require('../../Assets/avatar-thumbnail.jpg');

const Detail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { article, inProgress, deleted, errors } = useSelector(selectArticle);
    const user = useSelector(selectUser);
    const { slug } = useParams();
    useEffect(() => {
        const fetchArticle = dispatch(getArticle({ slug }));
        return () => {
            fetchArticle.abort();
        };
    }, [dispatch, slug]);
    useEffect(() => {
        if (errors) navigate('/404.json');
    }, [errors, navigate]);
    useEffect(() => () => dispatch(articlePageUnloaded()), [dispatch]);
    if (!article) return <div>{inProgress && <Skeleton />}</div>;
    return (
        <>
            <div className="header-article">
                <Tooltip title={article.title} placement="top" followCursor arrow>
                    <h1>{article.title} </h1>
                </Tooltip>
                <div className="author-article d-flex">
                    <Link to={`/@${article?.author?.username}`}>
                        <Avatar alt="avatar_img" src={article?.author?.image}>
                            <img alt="thumnail-article" width="50" height="50" src={avt} />
                        </Avatar>
                    </Link>

                    <div className="author-detail">
                        <Link to={`/@${article?.author?.username}`} className="author">
                            {article.author.username}
                        </Link>
                        <div className="create-article">
                            <time dateTime={article.createdAt}>
                                {dayjs(article.createdAt).format('DD/MM/YYYY HH:mm')}
                            </time>
                        </div>
                    </div>
                    <div className="ms-auto">
                        <Favorite
                            slug={slug}
                            favorited={article.favorited}
                            count={article.favoritesCount}
                        />
                    </div>
                </div>
                {user &&
                    (user.username === article.author.username ? (
                        <OptionArticle slug={slug} deleted={deleted} />
                    ) : (
                        <Follow
                            username={article.author.username}
                            following={article.author.following}
                        />
                    ))}
            </div>
            <div className="tag-article d-flex">
                {article &&
                    article.tagList.map((tag) => {
                        return (
                            <div
                                className="mx-1 px-2 py-1 rounded-pill bg-secondary text-light"
                                key={tag}
                            >
                                {tag}
                            </div>
                        );
                    })}
            </div>
            <hr />
            <div className="content-article" dangerouslySetInnerHTML={{ __html: article.body }} />
        </>
    );
};

export default memo(Detail);
