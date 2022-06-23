import React from 'react';

import ProfileComponent from '../components/Profile/profile';
function Profile({ favorite }) {
    return <ProfileComponent isFavoritePage={favorite ? true : false} />;
}

export default Profile;
