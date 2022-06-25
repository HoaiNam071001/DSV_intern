import React from 'react';
import Article from '../components/Article/detailArticle';
import Comment from '../components/Comments/comment';

function detailArticle() {
    return (
        <div className="container">
            <div className="row col-12 col-md-10 offset-md-1 detail-article">
                <Article />
                <Comment />
            </div>
        </div>
    );
}

export default detailArticle;
