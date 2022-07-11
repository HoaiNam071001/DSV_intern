import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';

import Message from '../Message';
import { selectIsAuthenticated, selectUser } from '../../redux/reducers/authSlice';
import CommentList from './commentList';
import {
    createComment,
    selectErrors,
    commentPageUnloaded,
} from '../../redux/reducers/commentsSlice';
import { selectArticle } from '../../redux/reducers/articleSlice';
import Loading from '../Loading';

function CommentForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);
    const { slug } = useParams();
    const [body, setBody] = useState('');
    const saveComment = (event) => {
        event.preventDefault();
        if (body === '') return;
        dispatch(createComment({ articleSlug: slug, comment: { body } }));
        setBody('');
    };
    const saveCommentEnter = (e) => {
        e.preventDefault();
        if (e.key === 'Enter') saveComment(e);
    };

    return (
        <div className="my-4 comment-item border">
            <TextField
                sx={{
                    '& .MuiOutlinedInput-root': {
                        background: '#fff',
                        borderRadius: 5,
                        margin: 2,
                    },
                    '& label': { fontSize: 16, margin: 2 },
                }}
                className="form-control comment-item-write"
                label="Comment"
                variant="outlined"
                placeholder="Write your comment..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onKeyUp={saveCommentEnter}
            />

            <div className="d-flex align-items-center comment-item-user">
                <img
                    className="rounded-circle m-1"
                    width="40"
                    height="40"
                    alt={currentUser.username}
                    src={currentUser.image || require('../../Assets/avatar-thumbnail.jpg')}
                />
                <span className="mx-2 fs-5 info-username">{currentUser.username}</span>
                <button
                    className="btn btn-primary ms-auto rounded-pill m-1"
                    onClick={saveComment}
                    onKeyUp={saveCommentEnter}
                >
                    Post Comment
                </button>
            </div>
        </div>
    );
}

function CommentSection() {
    const dispatch = useDispatch();
    const isAuthenticaded = useSelector(selectIsAuthenticated);
    const errors = useSelector(selectErrors);
    const { article } = useSelector(selectArticle);

    useEffect(() => () => dispatch(commentPageUnloaded()), [dispatch]);
    if (!article) {
        return <Loading />;
    }
    return (
        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <Message messagess={errors} />
            {isAuthenticaded ? (
                <CommentForm />
            ) : (
                <p>
                    <Link to="/login">Sign in</Link>
                    &nbsp;or&nbsp;
                    <Link to="/register">sign up</Link>
                    &nbsp;to add comments on this article.
                </p>
            )}
            <CommentList />
        </div>
    );
}

export default CommentSection;
