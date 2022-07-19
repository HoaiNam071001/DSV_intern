import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Message from '../Message';
import {
    getArticle,
    createArticle,
    updateArticle,
    articlePageUnloaded,
    selectArticle,
} from '../../redux/reducers/articleSlice';
import JoditEditor from './textEditor';
import { useParams } from 'react-router';
import Loading from '../Loading';
import { Input } from '../Auth/input';

const EditArticle = () => {
    const dispatch = useDispatch();
    const { article, errors, inProgress, success } = useSelector(selectArticle);
    const { slug } = useParams();

    const [thumbnail, setThumbnail] = useState('');
    const [body, setBody] = useState('');
    const [tagList, setTagList] = useState([]);
    const [tagIn, setTagin] = useState('');

    const handleEnter = (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            if (tagIn && !tagList.includes(tagIn)) setTagList([...tagList, tagIn]);
            setTagin('');
        }
    };
    const removeTag = (e) => {
        setTagList((pre) => pre.filter((value) => value !== e.target.outerText));
    };
    useEffect(() => {
        if (slug && article) {
            setThumbnail(article.thumbnail);
            setBody(article.body);
            setTagList(article.tagList);
        }
    }, [article, slug]);

    useEffect(() => {
        if (slug) dispatch(getArticle({ slug }));
        return () => dispatch(articlePageUnloaded());
    }, [slug, dispatch]);

    if ((slug && !article) || (!slug && article)) return <Loading />;
    return (
        <div className="container ">
            <div className="row">
                <div className=" col-12 col-md-10 offset-md-1 editor-container">
                    <div className="text-center fs-2 fw-bold m-2">
                        {slug ? 'Update Article' : 'Create a New Article'}
                    </div>
                    <div className="text-center col-12 col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                        {success && (
                            <Message
                                messagess={slug ? { Update: ['Success'] } : { Create: ['Success'] }}
                                state={'success'}
                            />
                        )}
                        {errors && <Message messagess={errors} />}
                    </div>
                    <Formik
                        initialValues={{
                            title: article?.title || '',
                            description: article?.description || '',
                        }}
                        validationSchema={Yup.object({
                            title: Yup.string()
                                .min(5, 'Title must be at least 5 characters.')
                                .required('Title Required'),
                            description: Yup.string().required('Description is Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            const article = {
                                title: values.title,
                                description: values.description,
                                body,
                                tagList,
                                thumbnail,
                            };
                            dispatch(
                                slug ? updateArticle({ slug, article }) : createArticle(article)
                            );
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
                                <div className="thumbnail-container row">
                                    <div className="col-6 col-md-8">
                                        <Input
                                            label="Thumnail"
                                            name="thumnail"
                                            value={thumbnail}
                                            onChange={(e) => setThumbnail(e.target.value)}
                                            type="text"
                                            placeholder="Write description for Article"
                                        />
                                    </div>
                                    <div className="col-6 col-md-4 image">
                                        <img
                                            src={thumbnail || require('../../Assets/blog.jpg')}
                                            alt="thumnail"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4 text-body">
                                    <JoditEditor
                                        body={body}
                                        setBody={setBody}
                                        config={{
                                            placeholder: 'Write Your Article . . .',
                                            readonly: false,
                                        }}
                                    />
                                </div>
                                <TextField
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            background: '#fff',
                                            fontSize: 20,
                                        },
                                        '& label': { fontSize: 20 },
                                    }}
                                    label="Enter Tag"
                                    variant="outlined"
                                    value={tagIn}
                                    onChange={(e) => setTagin(e.target.value)}
                                    onKeyUp={handleEnter}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {tagList.map((tag) => {
                                                    return (
                                                        <div
                                                            key={tag}
                                                            className="px-2 py-1 mx-1 tag-item-article"
                                                            onClick={removeTag}
                                                        >
                                                            {tag}
                                                        </div>
                                                    );
                                                })}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <button
                                    className="btn-submit-editor rounded-pill p-2 m-3 float-end"
                                    disabled={inProgress}
                                    type="submit"
                                >
                                    {inProgress ? <Loading /> : slug ? 'Update' : 'Create Article'}
                                </button>
                            </Box>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default EditArticle;
