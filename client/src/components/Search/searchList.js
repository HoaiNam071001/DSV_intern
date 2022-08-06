import React, { useEffect, useState } from 'react';
import { selectUser } from '../../redux/reducers/authSlice';
import ChatBtn from '../Profile/chatBtn';
import { API } from '../../Services/Axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Avt = require('../../Assets/avatar-thumbnail.jpg');
import Avatar from '@mui/material/Avatar';

const SearchList = ({ keyword }) => {
    const currentUser = useSelector(selectUser);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        API.Search(keyword).then((result) => setUsers(result.data));
    }, [keyword]);
    return (
        <div className="search-list col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            {users.map((user) => {
                if (currentUser.id !== user.id)
                    return (
                        <div key={user.id} className="search-item">
                            <div className="d-flex">
                                <div className="image">
                                    <Link to={`/@${user?.username}`}>
                                        <Avatar alt="avatar" src={user?.image}>
                                            <img alt="avatar" src={Avt} />
                                        </Avatar>
                                    </Link>
                                </div>
                                <div className="info d-flex flex-column justify-content-center">
                                    <Link to={`/@${user?.username}`} className="link-nodecoration">
                                        <div className="username">{user?.username}</div>
                                    </Link>
                                    <div className="bio">{user?.bio}</div>
                                </div>
                                <div className="contact d-flex align-items-center">
                                    <div className="chat">
                                        <ChatBtn id={user.id} />
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    );
                else return <></>;
            })}
        </div>
    );
};
export default SearchList;
