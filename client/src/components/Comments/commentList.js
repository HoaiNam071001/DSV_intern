import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading';
import {
    getCommentsForArticle,
    removeComment,
    selectAllComments,
    selectIsAuthor,
    selectIsLoading,
} from '../../redux/reducers/commentsSlice';

function DeleteCommentButton({ commentId }) {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const { slug } = useParams();

    const deleteComment = () => {
        dispatch(removeComment({ articleSlug: slug, commentId }));
    };

    return (
        <button
            className="btn btn-danger ms-auto d-flex align-items-center rounded-pill"
            disabled={isLoading}
            onClick={deleteComment}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eraser"
                viewBox="0 0 16 16"
            >
                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
            </svg>
        </button>
    );
}

function Comment({ comment }) {
    const isAuthor = useSelector(selectIsAuthor(comment.id));

    return (
        <div className="border my-2 comment-item">
            <div className="comment-item-info d-flex align-items-center">
                <Link to={`/@${comment.author.username}`}>
                    <img
                        width="35"
                        height="35"
                        className="rounded-circle"
                        alt="avatar"
                        src={comment.author.image || require('../../Assets/avatar-thumbnail.jpg')}
                    />
                </Link>
                <Link to={`/@${comment.author.username}`} className="info-username">
                    {comment.author.username}
                </Link>
                <time className="date-posted" dateTime={comment.createdAt}>
                    {new Date(comment.createdAt).toDateString()}
                </time>
                {isAuthor ? <DeleteCommentButton commentId={comment.id} /> : null}
            </div>
            <div className="comment-item-body">{comment.body}</div>
        </div>
    );
}

function CommentList() {
    const dispatch = useDispatch();
    const comments = useSelector(selectAllComments);
    const isLoading = useSelector(selectIsLoading);
    const { slug } = useParams();
    useEffect(() => {
        const fetchComments = dispatch(getCommentsForArticle(slug));
        return () => {
            fetchComments.abort();
        };
    }, [slug, dispatch]);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </>
    );
}

export default CommentList;
