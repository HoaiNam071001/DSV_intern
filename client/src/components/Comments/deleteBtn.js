import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeComment, selectIsLoading } from '../../redux/reducers/commentsSlice';

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

export default DeleteCommentButton;
