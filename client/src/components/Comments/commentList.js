import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
    getCommentsForArticle,
    selectAllComments,
    selectIsAuthor,
} from '../../redux/reducers/commentsSlice';
import dayjs from 'dayjs';
import DeleteCommentButton from './deleteBtn';
import Avatar from '@mui/material/Avatar';
const Avt = require('../../Assets/avatar-thumbnail.jpg');

function Comment({ comment }) {
    const isAuthor = useSelector(selectIsAuthor(comment.id));

    return (
        <div className="my-2 comment-item">
            <div className="comment-item-info d-flex align-items-center">
                <Link to={`/@${comment.author.username}`}>
                    <Avatar alt="avatar" src={comment.author?.image}>
                        <img
                            width="35"
                            height="35"
                            className="rounded-circle"
                            alt="author"
                            src={Avt}
                        />
                    </Avatar>
                </Link>
                <div className="user-cmt">
                    <Link to={`/@${comment.author?.username}`} className="info-username">
                        {comment.author?.username}
                    </Link>
                    <div>
                        <time className="date-posted" dateTime={comment.createdAt}>
                            {dayjs(comment.createdAt).format('DD/MM/YYYY HH:mm')}
                        </time>
                    </div>
                </div>

                {isAuthor ? <DeleteCommentButton commentId={comment.id} /> : null}
            </div>
            <div className="comment-item-body">{comment.body}</div>

            <hr />
        </div>
    );
}

function CommentList() {
    const dispatch = useDispatch();
    const comments = useSelector(selectAllComments);
    const { slug } = useParams();
    useEffect(() => {
        const fetchComments = dispatch(getCommentsForArticle(slug));
        return () => {
            fetchComments.abort();
        };
    }, [slug, dispatch]);
    if (!comments) return <></>;
    return (
        <>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </>
    );
}

export default CommentList;
