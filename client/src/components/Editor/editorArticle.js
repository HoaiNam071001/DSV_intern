import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Formik, Form } from 'formik';
import Message from '../Message';
import {
    getArticle,
    createArticle,
    updateArticle,
    articlePageUnloaded,
    selectArticle,
} from '../../redux/reducers/articleSlice';
import { useParams } from 'react-router';
import Loading from '../Loading';
import { Input } from './input';
import { useNavigate } from 'react-router-dom';
import { objYup } from './value';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Jodit from './textEditor';
import Tag from './tag';
import { selectUser, selectIsLoading } from '../../redux/reducers/authSlice';

const EditArticle = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);
    const { article, errors, inProgress, success } = useSelector(selectArticle);
    const { slug } = useParams();
    const loading = useSelector(selectIsLoading);
    const [thumbnail, setThumbnail] = useState();
    const [body, setBody] = useState('');
    const [tagList, setTagList] = useState([]);
    const [load, setLoad] = useState(false);
    const [validateThum, setvalidateThum] = useState(false);

    useEffect(() => {
        if (errors) navigate('/404.json');
    }, [errors, navigate]);
    useEffect(() => {
        if (!currentUser && !loading) navigate('/');
    }, [navigate, currentUser, loading]);
    useEffect(() => {
        if (slug && article && currentUser.id !== article.author?.id) navigate('/editor');
    }, [slug, article, navigate, currentUser]);

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
    useEffect(() => {
        return () => {
            thumbnail && URL.revokeObjectURL(thumbnail.preview);
        };
    }, [thumbnail]);

    useEffect(() => {
        if (slug && article) {
            setThumbnail({ preview: article.thumbnail });
            setBody(article.body);
            setTagList(article.tagList);
        } else if (!slug) {
            setThumbnail('');
            setBody('');
            setTagList([]);
        }
    }, [article, slug]);

    useEffect(() => {
        if (slug) dispatch(getArticle({ slug }));
    }, [slug, dispatch]);
    const handleSubmit = (values) => {
        if (thumbnail?.type) {
            const data = new FormData();
            data.append('file', thumbnail);
            data.append('upload_preset', 'h5z4ewnk');
            data.append('api_key', '441634564439267');
            setLoad(true);
            fetch('  https://api.cloudinary.com/v1_1/h5z4ewnk/image/upload', {
                method: 'post',
                body: data,
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setLoad(false);
                    const article = {
                        title: values.title,
                        description: values.description,
                        body,
                        tagList,
                        thumbnail: String(data.url),
                    };
                    dispatch(slug ? updateArticle({ slug, article }) : createArticle(article));
                })
                .catch((err) => {
                    setLoad(false);
                    alert(err);
                });
        } else {
            const article = {
                title: values.title,
                description: values.description,
                body,
                tagList,
                thumbnail: thumbnail.preview,
            };
            dispatch(slug ? updateArticle({ slug, article }) : createArticle(article));
        }
    };
    useEffect(() => {
        if (success) navigate('/');
    }, [success, navigate]);
    useEffect(() => () => dispatch(articlePageUnloaded()), [dispatch]);
    if (slug && !article) return <Loading />;
    return (
        <div className="container ">
            <div className="row">
                <div className=" col-12 col-md-10 offset-md-1 editor-container">
                    <div className="text-center fs-2 fw-bold m-2">
                        {slug ? 'Update Article' : 'New Article'}
                    </div>

                    <Formik
                        initialValues={{
                            title: article ? article.title : '',
                            description: article ? article.description : '',
                        }}
                        enableReinitialize
                        validationSchema={objYup}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values);
                            setSubmitting(true);
                        }}
                    >
                        <Form>
                            <Box
                                sx={{
                                    '& .MuiTextField-root': {
                                        my: 2,
                                        width: '100%',
                                    },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <div className="row">
                                    <div className="col-12 col-sm-8">
                                        <Input
                                            label="Article Title"
                                            name="title"
                                            type="text"
                                            placeholder="Write article title"
                                        />
                                        <Input
                                            label="Description for Article"
                                            name="description"
                                            type="text"
                                            placeholder="Write description for Article"
                                        />
                                    </div>
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
                                                src={
                                                    (thumbnail && thumbnail.preview) ||
                                                    require('../../Assets/blog.jpg')
                                                }
                                                alt="thumnail"
                                            />
                                            <div className="upload-thumbnail">
                                                <label
                                                    htmlFor="inputthumbnail"
                                                    className=" d-flex justify-content-center align-items-center"
                                                >
                                                    <UploadFileIcon />
                                                </label>
                                                <div style={{ color: 'red' }}>
                                                    {validateThum && 'Type is not valid'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 text-body">
                                    <Jodit body={body} setBody={setBody} />
                                </div>

                                <Tag tagList={tagList} setTagList={setTagList} />
                                <button
                                    className="btn-submit-editor rounded-pill p-2 m-3 float-end"
                                    disabled={inProgress}
                                    type="submit"
                                >
                                    {inProgress || load ? (
                                        <Loading />
                                    ) : slug ? (
                                        'Update'
                                    ) : (
                                        'Create Article'
                                    )}
                                </button>
                            </Box>
                        </Form>
                    </Formik>

                    <div className="text-center col-12 col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                        {errors && <Message messagess={errors} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditArticle;
