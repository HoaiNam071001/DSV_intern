import React from 'react';
import Skeleton from '@mui/material/Skeleton';
const SkeletonArticle = () => {
    const arr = new Array(5);
    return (
        <>
            {arr.fill().map((e, index) => (
                <div key={index} className="feed-item">
                    <div className="row">
                        <div className="col-4 thumnail-article">
                            <Skeleton variant="rectangular" />
                        </div>
                        <div className="col-8 feed-content">
                            <div className="item-author d-flex align-items-center">
                                <Skeleton variant="circular" width={50} height={50} />
                                <div className="col-auto">
                                    <Skeleton variant="text" width={100} height={25} />
                                    <Skeleton variant="text" width={100} height={25} />
                                </div>
                            </div>

                            <Skeleton variant="text" width="100%" height={50} />
                            <Skeleton variant="text" width="100%" height={40} />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
export default SkeletonArticle;
