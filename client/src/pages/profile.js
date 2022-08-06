import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArticleList from '../components/ArticlesList/articleList';
import { getArticlesByAuthor, getFavoriteArticles } from '../redux/reducers/articleListSlice';
import { getProfile, profilePageUnloaded, selectProfile } from '../redux/reducers/profileSlice';
import { selectUser } from '../redux/reducers/authSlice';
import UserInfo from '../components/Profile/info';
import ProfileTabs from '../components/Profile/tabs';

function Profile({ isFavoritePage }) {
    const dispatch = useDispatch();
    const { username } = useParams();

    const selectprofile = useSelector(selectProfile);
    const selectUserAuthor = useSelector(selectUser);
    const [profile, setProfile] = useState(selectprofile);

    useEffect(() => {
        if (JSON.stringify(selectprofile) !== JSON.stringify(profile)) {
            setProfile(selectprofile);
        }
    }, [selectprofile, profile]);
    useEffect(() => {
        const fetchProfile = dispatch(getProfile({ username }));
        const fetchArticles = dispatch(
            isFavoritePage
                ? getFavoriteArticles({ favorited: username })
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
    return (
        <div className="container">
            <div className="row profile-container">
                <UserInfo profile={profile} author={selectUserAuthor} />
                <div id="topscroll"></div>
                <ProfileTabs username={profile.username} isFavorites={isFavoritePage} />
                <div className="col-lg-8 offset-lg-2">
                    <ArticleList />
                </div>
            </div>
        </div>
    );
}

export default Profile;
