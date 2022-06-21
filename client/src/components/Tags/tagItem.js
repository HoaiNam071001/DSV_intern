import React from 'react';
import { Link } from 'react-router-dom';
import { getArticlesByTag } from '../ArticlesList/articleListSlice';
import { useDispatch } from 'react-redux';

function TagsList({ tag }) {
    const dispatch = useDispatch();
    const handleClickTag = () => {
        dispatch(getArticlesByTag({ tag }));
    };
    return (
        <Link
            to="#"
            className="link-nodecoration rounded-pill float-start px-2 py-1 tag-item"
            onClick={handleClickTag}
        >
            {tag}
        </Link>
        // <ul className="tag-list">
        //     {tags.map((tag) => (
        //         <li className="tag-default tag-pill tag-outline" key={tag}>
        //             {tag}
        //         </li>
        //     ))}
        // </ul>
    );
}

export default TagsList;
