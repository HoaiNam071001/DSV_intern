import React from 'react';
import { Link } from 'react-router-dom';
import { getArticlesByTag, changenewTab } from '../../redux/reducers/articleListSlice';
import { useDispatch } from 'react-redux';

function TagItem({ tag }) {
    const dispatch = useDispatch();
    const handleClickTag = () => {
        dispatch(changenewTab('tag'));
        dispatch(getArticlesByTag({ tag }));
    };
    return (
        <Link to="#" className="link-nodecoration rounded-pill float-start px-2 py-1 tag-item" onClick={handleClickTag}>
            {tag}
        </Link>
    );
}

export default TagItem;
