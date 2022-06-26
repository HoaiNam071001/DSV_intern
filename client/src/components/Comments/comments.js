import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import ListErrors from '../ListErrors';
import { selectIsAuthenticated, selectUser } from '../Auth/authSlice';
import CommentList from './commentList';
import { createComment, selectErrors } from './commentsSlice';

function CommentForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);
    const { slug } = useParams();
    const [body, setBody] = useState('');

    const saveComment = (event) => {
        event.preventDefault();
        dispatch(createComment({ articleSlug: slug, comment: { body } }));
        setBody('');
    };

    return (
        <div className="my-4 border">
            <div className="form-floating m-2">
                <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingbodycomment"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label for="floatingbodycomment">Write a comment...</label>
            </div>

            <div className="bg-light d-flex align-items-center">
                <img
                    className="rounded-circle m-1"
                    width="40"
                    height="40"
                    alt={currentUser.username}
                    src={
                        currentUser.image ||
                        require('../../Assets/avatar-thumbnail.jpg')
                    }
                />
                <span className="mx-2 fs-5">{currentUser.username}</span>
                <button
                    className="btn btn-primary ms-auto rounded-pill m-1"
                    onClick={saveComment}
                >
                    Post Comment
                </button>
            </div>
        </div>
    );
}

function CommentSection() {
    const isAuthenticaded = useSelector(selectIsAuthenticated);
    const errors = useSelector(selectErrors);

    return (
        <div className="col-12 col-md-8 offset-md-2">
            <ListErrors errors={errors} />
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
