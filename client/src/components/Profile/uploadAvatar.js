import { useState, useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import FileUploadIcon from '@mui/icons-material/FileUploadRounded';
import { updateUser } from '../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';

function Avatar({ image, setModal }) {
    const [avatar, setAvatar] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            const files = e.target.files[0];
            files.preview = URL.createObjectURL(files);
            setAvatar(files);
        }
    };
    const changephotonow = () => {
        if (!avatar) {
            setModal(false);
            return;
        }
        const data = new FormData();
        data.append('file', avatar);
        data.append('upload_preset', 'h5z4ewnk');
        data.append('api_key', '441634564439267');
        fetch('  https://api.cloudinary.com/v1_1/h5z4ewnk/image/upload', {
            method: 'post',
            body: data,
        })
            .then((resp) => resp.json())
            .then((data) => {
                const user = {
                    image: String(data.url),
                };
                dispatch(updateUser(user));
                setModal(false);
                alert('Avatar update Success!');
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
                        <h2>Upload Avatar</h2>
                        <input
                            id="inputuploadimg"
                            type="file"
                            onChange={handleChange}
                            title="Upload file"
                            hidden
                        />
                        <div className="image-upload">
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
                            <button className="btn-save-img" onClick={changephotonow}>
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
