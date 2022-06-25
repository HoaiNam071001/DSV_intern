import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteArticle, unfavoriteArticle } from './articleListSlice';
import { selectUser } from '../Auth/authSlice';
const ArticleItem = ({ article }) => {
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
        <React.Fragment>
            <div key={article.slug} className="feed-item">
                <div className="row">
                    <div className="col-10">
                        <div className="item-author row d-flex align-items-center">
                            <Link to={`/@${article.author.username}`}>
                                <img
                                    width="60"
                                    height="60"
                                    className="img-thumbnail"
                                    src={
                                        article.author.image ||
                                        require('../../Assets/avatar-thumbnail.jpg')
                                    }
                                    alt="author"
                                />
                            </Link>
                            <div className="col-9">
                                <Link
                                    to={`/@${article.author.username}`}
                                    className="item-author-name"
                                >
                                    {article.author.username}
                                </Link>
                                <div className="item-author-date">
                                    <time dateTime={article.createdAt}>
                                        {new Date(
                                            article.createdAt
                                        ).toDateString()}
                                    </time>
                                </div>
                            </div>
                        </div>
                        <Link
                            to={`/article/${article.slug}`}
                            className="link-nodecoration"
                        >
                            <div className="item-title"> {article.title} </div>
                            <div className="item-content text-truncate">
                                {article.body}
                            </div>
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
                    <div className="col-2">
                        <button
                            className={`${
                                article.favorited ? 'btn-favorate-active' : ''
                            } btn-favorate d-flex align-items-center justify-content-center`}
                            onClick={handleClick}
                        >
                            <img
                                src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf9/1.5/32/2764.png"
                                alt="tym"
                            />
                            <div>{article.favoritesCount}</div>
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ArticleItem;
