import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from '../Loading';
import {
    getCommentsForArticle,
    removeComment,
    selectAllComments,
    selectIsAuthor,
    selectIsLoading,
} from '../../redux/reducers/commentsSlice';
import dayjs from 'dayjs';

function DeleteCommentButton({ commentId }) {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const { slug } = useParams();

    const deleteComment = () => {
        dispatch(removeComment({ articleSlug: slug, commentId }));
    };

    return (
        <>
            <button
                disabled={isLoading}
                type="button"
                className="ms-auto d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#deletecmtModal"
            >
                <DeleteIcon sx={{ fontSize: 17 }} />
            </button>
            <div
                className="modal fade"
                id="deletecmtModal"
                tabIndex="1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="false"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Confirm Delete
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">Do you want to delete this comment?</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={deleteComment}
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function Comment({ comment }) {
    const isAuthor = useSelector(selectIsAuthor(comment.id));

    return (
        <div className="my-2 comment-item">
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
                    {dayjs(comment.createdAt).format('DD/MM/YYYY HH:mm')}
                </time>
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
        <>{comments && comments.map((comment) => <Comment key={comment.id} comment={comment} />)}</>
    );
}

export default CommentList;
