import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArticleList from '../ArticlesList/articleList';
import {
    getArticlesByAuthor,
    getFavoriteArticles,
} from '../ArticlesList/articleListSlice';
import {
    follow,
    unfollow,
    getProfile,
    profilePageUnloaded,
} from './profileSlice';
import { selectUser } from '../Auth/authSlice';

function EditProfileSettings() {
    return (
        <Link
            to="/settings"
            className="float-end btn btn-outline-light d-flex align-items-center"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-gear m-1"
                viewBox="0 0 16 16"
            >
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
            </svg>
            Edit Profile
        </Link>
    );
}

function FollowUserButton({ username, following }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);
    let textMessage;

    if (following) {
        textMessage = `Unfollow ${username}`;
    } else {
        textMessage = `Follow ${username}`;
    }

    const handleClick = () => {
        if (!currentUser) {
            navigate(`/login`);
            return;
        }

        if (following) {
            dispatch(unfollow({ username }));
        } else {
            dispatch(follow({ username }));
        }
    };

    return (
        <button
            onClick={handleClick}
            className="float-end btn btn-outline-light d-flex align-items-center"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-award-fill"
                viewBox="0 0 16 16"
            >
                <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z" />
                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
            </svg>
            {textMessage}
        </button>
    );
}

function UserInfo({ profile }) {
    const currentUser = useSelector(selectUser);
    const isCurrentUser = profile.username === currentUser?.username;
    const [img, setImg] = useState('#52D4FF');

    return (
        <div className="p-3 rounded-bottom" style={{ backgroundColor: img }}>
            <div className="d-flex justify-content-center">
                <div className="rounded-circle text-center container-avt-img">
                    <img
                        src={
                            profile.image ||
                            require('../../Assets/avatar-thumbnail.jpg')
                        }
                        className="avt-img rounded-circle"
                        alt={profile.username}
                    />
                </div>
            </div>
            <div className="text-center m-2">
                <div className="fs-3 fw-semibold">{profile.username}</div>
                <div className="fs-5">{profile.bio}</div>
            </div>
            <input
                type="color"
                className="form-control form-control-color d-inline-flex"
                value={img}
                onChange={(e) => setImg(e.target.value)}
            />
            {isCurrentUser ? (
                <EditProfileSettings />
            ) : (
                <FollowUserButton
                    username={profile.username}
                    following={profile.following}
                />
            )}
        </div>
    );
}

function ProfileTabs({ username, isFavorites }) {
    return (
        <div className="row">
            <div className="col-4 col-lg-3 col-sm-4 text-center">
                <Link
                    to={`/@${username}`}
                    className={`link-nodecoration item-link-profile ${
                        !isFavorites ? 'bg-tab-active' : ''
                    }`}
                >
                    My Articles
                </Link>
            </div>
            <div className="col-4 col-lg-3 col-sm-4 text-center">
                <Link
                    to={`/@${username}/favorites`}
                    className={`link-nodecoration item-link-profile ${
                        isFavorites ? 'bg-tab-active' : ''
                    }`}
                >
                    My Favorites
                </Link>
            </div>
            <hr />
        </div>
    );
}

function Profile({ isFavoritePage }) {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const { username } = useParams();

    useEffect(() => {
        const fetchProfile = dispatch(getProfile({ username }));
        const fetchArticles = dispatch(
            isFavoritePage
                ? getFavoriteArticles({ username })
                : getArticlesByAuthor({ author: username })
        );

        return () => {
            fetchProfile.abort();
            fetchArticles.abort();
        };
    }, [username, isFavoritePage, dispatch]);

    useEffect(
        () => () => {
            dispatch(profilePageUnloaded());
        },
        [dispatch]
    );

    if (!profile) {
        return <div>InValid User </div>;
    }

    return (
        <div className="container">
            <div className="row col-md-10 offset-md-1 col-xs-12">
                <UserInfo profile={profile} />
                <ProfileTabs
                    username={profile.username}
                    isFavorites={isFavoritePage}
                />

                <ArticleList />
            </div>
        </div>
    );
}

export default Profile;