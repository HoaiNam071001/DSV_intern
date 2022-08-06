import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import Picker from 'emoji-picker-react';
import Message from '../Message';
import { selectIsAuthenticated } from '../../redux/reducers/authSlice';
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
    const { slug } = useParams();
    const [body, setBody] = useState('');
    const saveComment = () => {
        if (/^(\n| )*$/.test(body)) return;
        dispatch(createComment({ articleSlug: slug, comment: { body } }));
        setBody('');
    };
    const saveCommentEnter = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) saveComment(e);
    };
    const onEmojiClick = (event, emojiObject) => {
        setBody((pre) => pre + emojiObject.emoji);
    };
    return (
        <div className="my-4 comment-item">
            <TextField
                label="Comment"
                className="form-control"
                placeholder="Write your comment..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onKeyDown={saveCommentEnter}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <div className="col-1 icon-chatbox d-flex justify-content-end">
                                <div
                                    className="nav-link d-flex align-items-center"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                >
                                    <i className="bi bi-emoji-smile"></i>
                                </div>

                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Picker onEmojiClick={onEmojiClick} />
                                    </li>
                                </ul>
                            </div>
                            &nbsp;
                            <button
                                className="ms-auto btn-addcmt"
                                onClick={saveComment}
                                onKeyUp={saveCommentEnter}
                            >
                                <i className="bi bi-send-fill"></i>
                            </button>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}

function CommentSection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticaded = useSelector(selectIsAuthenticated);
    const errors = useSelector(selectErrors);
    const { article } = useSelector(selectArticle);

    useEffect(() => {
        if (errors && errors === 404) navigate('/404.json');
    }, [errors, navigate]);
    useEffect(() => () => dispatch(commentPageUnloaded()), [dispatch]);
    if (!article) return <Loading />;

    return (
        <div className="col-12 col-lg-8 offset-lg-2">
            <hr />
            <div className="m-2">
                <h2>
                    &nbsp;Discussion&nbsp;
                    <SmsFailedIcon />
                </h2>
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
        </div>
    );
}

export default CommentSection;
