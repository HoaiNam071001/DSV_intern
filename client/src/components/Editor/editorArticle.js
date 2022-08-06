import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import Message from '../Message';
import { getArticle, articlePageUnloaded, selectArticle } from '../../redux/reducers/articleSlice';
import { useParams } from 'react-router';
import Loading from '../Loading';
import Form, { Input, submitForm, Button } from './form';
import { useNavigate } from 'react-router-dom';
import { objYup } from './value';
import Jodit from './textEditor';
import Tag from './tag';
import Thumnail from './thumnail';
import { selectUser, selectIsLoading } from '../../redux/reducers/authSlice';
import { saveImage } from '../../common/utils';

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
    const isSubmit = load || inProgress;
    useEffect(() => {
        if (errors) navigate('/404.json');
        else if (!currentUser && !loading) navigate('/');
        else if (slug && article && currentUser.id !== article.author?.id) navigate('/editor');
    }, [slug, article, navigate, currentUser, errors, loading]);

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
            setLoad(true);
            saveImage(thumbnail)
                .then((data) => {
                    setLoad(false);
                    submitForm(dispatch, slug, values, body, tagList, String(data.url));
                })
                .catch((err) => {
                    setLoad(false);
                    alert(err);
                });
        } else {
            submitForm(dispatch, slug, values, body, tagList, thumbnail.preview);
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
                                <Thumnail thumbnail={thumbnail} setThumbnail={setThumbnail} />
                            </div>
                            <Jodit body={body} setBody={setBody} />
                            <Tag tagList={tagList} setTagList={setTagList} />
                            <Button isSubmit={isSubmit} slug={slug} />
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
