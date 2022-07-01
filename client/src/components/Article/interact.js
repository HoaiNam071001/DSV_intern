import { follow, unfollow, favorite, unfavorite } from './articleSlice';
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-award-fill "
                    viewBox="0 0 16 16"
                >
                    <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z" />
                    <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                </svg>
                {following ? 'Unfollow' : 'Follow'}
            </button>

            <button
                className={`d-flex align-items-center justify-content-center  btn-article btn-favorite-article ${
                    favorited ? 'btn-favorite-article-active' : ''
                }`}
                onClick={handleClickFavorite}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-balloon-heart-fill"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"
                    />
                </svg>
                <div>{count}</div>
            </button>
        </div>
    );
};

export default InteractArticle;
