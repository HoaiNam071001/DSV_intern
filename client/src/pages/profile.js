import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArticleList from '../components/ArticlesList/articleList';
import { getArticlesByAuthor, getFavoriteArticles } from '../redux/reducers/articleListSlice';
import { getProfile, profilePageUnloaded, selectProfile } from '../redux/reducers/profileSlice';
import UserInfo from '../components/Profile/info';
import ProfileTabs from '../components/Profile/tabs';

function Profile({ isFavoritePage }) {
    const dispatch = useDispatch();
    const { username } = useParams();

    const selectprofile = useSelector(selectProfile);
    const [profile, setProfile] = useState(selectprofile);
    useEffect(() => {
        if (JSON.stringify(selectprofile) !== JSON.stringify(profile)) {
            setProfile(selectprofile);
        }
    }, [selectprofile, profile]);
    useEffect(() => {
        const fetchProfile = dispatch(getProfile({ username }));
        const fetchArticles = dispatch(
            isFavoritePage ? getFavoriteArticles({ favorited: username }) : getArticlesByAuthor({ author: username })
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
            <div className="row">
                <div className="col-md-10 offset-md-1 col-12">
                    <UserInfo profile={profile} />
                    <ProfileTabs username={profile.username} isFavorites={isFavoritePage} />
                </div>
                <div className="col-md-8 offset-md-2 col-12">
                    <ArticleList />
                </div>
            </div>
        </div>
    );
}

export default Profile;
