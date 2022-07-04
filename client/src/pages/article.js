import React from 'react';
import Article from '../components/Article/detailArticle';
import Comments from '../components/Comments/comments';

function detailArticle() {
    return (
        <div className="container">
            <div className="row col-12 col-md-10 offset-md-1 detail-article">
                <Article />
                <Comments />
            </div>
        </div>
    );
}

export default detailArticle;
