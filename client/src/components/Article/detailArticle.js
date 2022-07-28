import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { articlePageUnloaded, getArticle, selectArticle } from '../../redux/reducers/articleSlice';
import { selectUser } from '../../redux/reducers/authSlice';
import OptionArticle from './option';
import InteractArticle from './interact';
import Skeleton from './skeletonDetail';
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
        if (errors) navigate('/badrequest');
    }, [errors, navigate]);
    useEffect(() => () => dispatch(articlePageUnloaded()), [dispatch]);
    if (!article) {
        return <div>{inProgress && <Skeleton />}</div>;
    }
    return (
        <>
            <div className="header-article">
                <h1>{article.title} </h1>
                <div className="author-article d-flex">
                    <Link to={`/@${article?.author?.username}`}>
                        <img
                            src={
                                article?.author?.image ||
                                require('../../Assets/avatar-thumbnail.jpg')
                            }
                            alt="avatar_img"
                            width="50"
                            height="50"
                        />
                    </Link>

                    <div className="author-detail">
                        <Link to={`/@${article?.author?.username}`} className="author">
                            {article.author.username}
                        </Link>
                        <div className="create-article">
                            <time dateTime={article.createdAt}>
                                {new Date(article.createdAt).toDateString()}
                            </time>
                        </div>
                    </div>

                    {user &&
                        (user.username === article.author.username ? (
                            <OptionArticle slug={slug} deleted={deleted} />
                        ) : (
                            <InteractArticle
                                username={article.author.username}
                                following={article.author.following}
                                slug={slug}
                                favorited={article.favorited}
                                count={article.favoritesCount}
                            />
                        ))}
                </div>
            </div>
            <div className="script-article">
                {/* <div className="description-article">{article.description}</div> */}
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
            </div>
            <hr />
            <div className="content-article" dangerouslySetInnerHTML={{ __html: article.body }} />
        </>
    );
};

export default memo(Detail);
