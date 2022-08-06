import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export const SkeletonChatUser = () => {
    return (
        <div className="messenger-body-header d-flex">
            <div className="chatbox-image">
                <Skeleton variant="circular" width={45} height={45} />
            </div>
            <div className="chatbox-header-info d-flex justify-content-center flex-column">
                <div className="chatbox-info-name">
                    <Skeleton animation="wave" width={160} height={30} />
                </div>
                <div className="chatbox-info-status">
                    <Skeleton animation="wave" width={100} height={25} />
                </div>
            </div>
            <div className="ms-auto align-self-center">
                <Skeleton variant="circular" width={40} height={40} />
            </div>
        </div>
    );
};
export const Skeletonchatbox = () => {
    return (
        <>
            <div className="body-chatbox d-flex flex-column-reverse">
                <div className="d-flex flex-column-reverse">
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="input-chatbox row">
                <div className="chatbox-message col-10 d-flex">
                    <input className="col-11" placeholder="Type a message" />
                    <div className="col-1 icon-chatbox d-flex justify-content-end">
                        <div
                            className="nav-link d-flex align-items-center"
                            role="button"
                            data-bs-toggle="dropdown"
                        >
                            <i className="bi bi-emoji-smile"></i>
                        </div>
                    </div>
                </div>
                <div className="chatbox-send col-2 d-flex justify-content-center align-items-center">
                    <button disabled>
                        <i className="bi bi-send-fill"></i>
                    </button>
                </div>
            </div>
        </>
    );
};
