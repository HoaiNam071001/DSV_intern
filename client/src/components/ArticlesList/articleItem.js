import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { favoriteArticle, unfavoriteArticle } from './articleListSlice';
const ArticleItem = ({ article }) => {
    const dispatch = useDispatch();
    const handleClick = (event) => {
        event.preventDefault();

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
                            <div className="col-ss-1 col-2 col-sm-2 col-md-15 col-lg-2 col-xl-x05">
                                <Link to={`/@${article.author.username}`}>
                                    <img
                                        className="img-thumbnail"
                                        src={article.author.image}
                                        alt="author"
                                    />
                                </Link>
                            </div>
                            <div className="col-9">
                                <Link
                                    to={`/@${article.author.username}`}
                                    className="item-author-name"
                                >
                                    {article.author.username}
                                </Link>
                                <div className="item-author-date">
                                    <span>Create: </span>
                                    {new Date(
                                        article.createdAt
                                    ).toLocaleString()}
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
