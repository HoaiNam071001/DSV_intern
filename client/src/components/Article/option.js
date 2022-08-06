import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteArticle } from '../../redux/reducers/articleSlice';
import Tooltip from '@mui/material/Tooltip';

const OptionArticle = ({ slug, deleted }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deleteHandle = (e) => {
        e.preventDefault();
        dispatch(deleteArticle(slug));
    };
    useEffect(() => {
        if (deleted) navigate('/');
    }, [deleted, navigate]);
    return (
        <div className="d-flex align-items-center justify-content-center mx-1">
            <Tooltip title="Edit this Article" placement="top" arrow>
                <Link to={`/editor/${slug}`} className="btn-editor-article btn-article">
                    Edit
                </Link>
            </Tooltip>

            <Tooltip title="Delete this Article" placement="top" arrow>
                <button
                    type="button"
                    className="btn-delete-article btn-article"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                >
                    Delete
                </button>
            </Tooltip>

            <div
                className="modal fade"
                id="deleteModal"
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
                        <div className="modal-body">Do you want to delete this article?</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={deleteHandle}
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
        </div>
    );
};
export default OptionArticle;
