import React, { useState, useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import FileUploadIcon from '@mui/icons-material/FileUploadRounded';
import { updateUser } from '../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { saveImage } from '../../common/utils';

function Avatar({ image, setModal }) {
    const [avatar, setAvatar] = useState();
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    useEffect(() => () => avatar && URL.revokeObjectURL(avatar.preview), [avatar]);
    const handleChange = (e) => {
        if (e.target.files[0]) {
            const files = e.target.files[0];
            if (/^image\/.*$/.test(files.type)) {
                files.preview = URL.createObjectURL(files);
                setAvatar(files);
            } else toast('Invalid image!');
        }
    };
    const changephotonow = () => {
        if (!avatar) return setModal(false);
        setLoad(true);
        saveImage(avatar)
            .then((data) => {
                const user = {
                    image: String(data.url),
                };
                setLoad(false);
                dispatch(updateUser(user));
                setModal(false);
                window.location.reload();
            })
            .catch((err) => alert(err));
    };

    return (
        <div className="container-uploadimg ">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-12 upload-avt-body ">
                        <button className="btn-exit" onClick={() => setModal(false)}>
                            <ClearIcon />
                        </button>
                        <ToastContainer />
                        <h2 className="d-flex align-items-center">
                            <AccountCircleIcon style={{ fontSize: 45 }} /> Upload Avatar
                        </h2>
                        <input
                            id="inputuploadimg"
                            type="file"
                            onChange={handleChange}
                            title="Upload file"
                            hidden
                        />
                        <div className="image-upload flex-column align-items-center">
                            <label htmlFor="inputuploadimg">
                                <img
                                    src={
                                        !avatar
                                            ? image || require('../../Assets/avatar-thumbnail.jpg')
                                            : avatar.preview
                                    }
                                    alt="myImage"
                                />
                                <div className="upload-icon">
                                    <FileUploadIcon />
                                </div>
                            </label>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <button
                                className="btn-save-img"
                                onClick={changephotonow}
                                disabled={load}
                            >
                                {load && (
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                )}
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Avatar;
