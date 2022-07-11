import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Clear';
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
            <DeleteIcon sx={{ fontSize: 17 }} />
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
