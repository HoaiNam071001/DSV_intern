import React from 'react';
import Skeleton from '@mui/material/Skeleton';
const SkeletonArticleDetail = () => {
    return (
        <div className="container">
            <div className="row detail-article">
                <div className="col-12 ">
                    <div>
                        <Skeleton variant="text" width="100%" height={100} />
                        <div className="d-flex align-items-center">
                            <Skeleton variant="circular" width={50} height={50} />
                            <Skeleton animation="wave" width={160} height={70} className="m-1" />
                            <Skeleton variant="caption" width={100} height={70} className="m-2" />
                            <Skeleton variant="caption" width={100} height={70} />
                        </div>
                    </div>
                    <div className="tag-article d-flex">
                        <Skeleton
                            variant="caption"
                            width={100}
                            height={30}
                            className="mx-2"
                            sx={{ borderRadius: 20 }}
                        />
                        <Skeleton
                            variant="caption"
                            width={100}
                            height={30}
                            className="mx-2"
                            sx={{ borderRadius: 20 }}
                        />
                    </div>
                    <hr />
                    <div className="content-article">
                        <Skeleton variant="text" width="100%" height={40} />
                        <Skeleton variant="text" width="100%" height={40} />
                        <Skeleton variant="text" width="100%" height={40} />
                        <Skeleton variant="text" width="100%" height={40} />
                        <Skeleton variant="text" width="100%" height={40} />
                        <Skeleton variant="text" width="100%" height={40} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SkeletonArticleDetail;
