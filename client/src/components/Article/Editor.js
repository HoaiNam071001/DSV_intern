import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from '../Toast';
import ListErrors from '../ListErrors';
import {
    getArticle,
    createArticle,
    updateArticle,
    articlePageUnloaded,
    selectArticle,
} from './articleSlice';
import { useParams } from 'react-router';
import TextEditor from './text';

const EditArticle = () => {
    const dispatch = useDispatch();
    const { article, errors, inProgress, success } = useSelector(selectArticle);
    const { slug } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const [tagIn, setTagin] = useState('');
    const [tagList, setTagList] = useState([]);
    const [toast, setToast] = useState(false);
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tagIn && !tagList.includes(tagIn))
                setTagList([...tagList, tagIn]);
            setTagin('');
        }
    };

    const removeTag = (e) => {
        setTagList((pre) =>
            pre.filter((value) => value !== e.target.outerText)
        );
    };
    const submitForm = (event) => {
        event.preventDefault();
        const article = {
            title,
            description,
            body,
            tagList,
        };
        dispatch(
            slug ? updateArticle({ slug, article }) : createArticle(article)
        );
    };

    useEffect(() => {
        if (slug) {
            dispatch(getArticle({ slug }));
        }
    }, [slug, dispatch]);

    useEffect(() => {
        if (slug && article) {
            setTitle(article.title);
            setDescription(article.description);
            setBody(article.body);
            setTagList(article.tagList);
        }
    }, [article, slug]);

    useEffect(() => {
        if (success) {
            setToast(true);
            setTimeout(() => setToast(false), 4000);
        }
    }, [success, dispatch]);

    useEffect(() => () => dispatch(articlePageUnloaded()), [dispatch]);
    return (
        <div className="container ">
            <div className="row col-md-10 offset-md-1 col-12 col-lg-8 offset-md-2 p-2">
                {toast && <Toast setToast={setToast} />}
                <ListErrors errors={errors} />
                <div className="text-center fs-2 fw-bold m-2">
                    {slug ? 'Update Article' : 'Create a New Article'}
                </div>
                <div className="px-4">
                    <div className="form-floating mb-4">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingArticleTitle"
                            placeholder="Article Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="floatingArticleTitle">
                            Article Title
                        </label>
                    </div>

                    <div className="form-floating mb-4">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingArticleDescription"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label htmlFor="floatingArticleDescription">
                            Description for Article
                        </label>
                    </div>

                    <div className="mb-4 text-body" style={{ height: 300 }}>
                        <TextEditor body={body} setBody={setBody} />
                    </div>

                    <div className="form-floating mb-4">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingArticleTag"
                            placeholder="Tag"
                            value={tagIn}
                            onChange={(e) => setTagin(e.target.value)}
                            onKeyUp={handleEnter}
                        />
                        <label htmlFor="floatingArticleTag">Enter Tag</label>
                    </div>
                    <div className="d-flex ">
                        {tagList.map((tag) => {
                            return (
                                <div
                                    key={tag}
                                    className="px-2 py-1 m-1 rounded-pill tag-item-article"
                                    onClick={removeTag}
                                >
                                    {tag}
                                </div>
                            );
                        })}
                    </div>
                    <button
                        className="btn btn-primary rounded-pill p-2 m-3 float-end"
                        disabled={inProgress}
                        onClick={submitForm}
                    >
                        {slug ? 'Update' : 'Create Article'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditArticle;
