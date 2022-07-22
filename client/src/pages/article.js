import React from 'react';
import Article from '../components/Article/detailArticle';
import Comments from '../components/Comments/comments';

function detailArticle() {
    return (
        <div className="container">
            <div className="row detail-article">
                <div className="col-12 ">
                    <Article />
                    <Comments />
                </div>
            </div>
        </div>
    );
}

export default detailArticle;
