import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteArticle, unfavoriteArticle } from '../../redux/reducers/articleListSlice';
import { selectUser } from '../../redux/reducers/authSlice';

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
        <button
            className={`${
                article.favorited ? 'btn-favorate-active' : ''
            } btn-favorate d-flex align-items-center justify-content-center`}
            onClick={handleClick}
        >
            <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf9/1.5/32/2764.png" alt="tym" />
            <div className="text-truncate">{article.favoritesCount}</div>
        </button>
    );
};

const ArticleItem = ({ article }) => {
    return (
        <React.Fragment>
            <div key={article.slug} className="feed-item">
                <div className="row">
                    <div className="col-8 col-sm-10 item-author d-flex align-items-center">
                        <Link to={`/@${article.author.username}`}>
                            <img
                                className="img-thumbnail"
                                src={article.author.image || require('../../Assets/avatar-thumbnail.jpg')}
                                alt="author"
                            />
                        </Link>
                        <div className="col-auto">
                            <Link to={`/@${article.author.username}`} className="item-author-name">
                                {article.author.username}
                            </Link>
                            <div className="item-author-date">
                                <time
                                    dateTime={article.createdAt}
                                    title={
                                        'createdAt:' +
                                        new Date(article.createdAt).toLocaleString() +
                                        '\nupdatedAt: ' +
                                        new Date(article.updatedAt).toLocaleString()
                                    }
                                >
                                    {new Date(article.createdAt).toDateString()}
                                </time>
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
                                <span key={tag} className="p-1 bg-light m-1 rounded-pill border float-end">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ArticleItem;
