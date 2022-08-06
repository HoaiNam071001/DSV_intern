import React, { useState, useEffect } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const EditArticle = ({ thumbnail, setThumbnail }) => {
    const [validateThum, setvalidateThum] = useState(false);

    const handleThumbnail = (e) => {
        if (e.target.files[0]) {
            const files = e.target.files[0];
            if (/^image\/.*$/.test(files.type)) {
                setvalidateThum(false);
                files.preview = URL.createObjectURL(files);
                setThumbnail(files);
            } else setvalidateThum(true);
        }
    };
    useEffect(() => () => thumbnail && URL.revokeObjectURL(thumbnail.preview), [thumbnail]);

    return (
        <div className="col-12 col-sm-4 thumbnail-container">
            <input
                id="inputthumbnail"
                type="file"
                onChange={handleThumbnail}
                title="Upload file"
                hidden
            />

            <div className="image">
                <img
                    src={(thumbnail && thumbnail.preview) || require('../../Assets/blog.jpg')}
                    alt="thumnail"
                />
                <div className="upload-thumbnail">
                    <label
                        htmlFor="inputthumbnail"
                        className=" d-flex justify-content-center align-items-center"
                    >
                        <UploadFileIcon />
                    </label>
                    <div style={{ color: 'red' }}>{validateThum && 'Type is not valid'}</div>
                </div>
            </div>
        </div>
    );
};

export default EditArticle;
