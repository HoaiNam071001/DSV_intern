import React, { useEffect } from 'react';
import Article from '../components/Article/detailArticle';
import Comments from '../components/Comments/comments';

function DetailArticle() {
    useEffect(() => document.body.scrollIntoView({ behavior: 'smooth' }), []);
    return (
        <div className="container">
            <div className="row ">
                <div className="col-12 ">
                    <div className="detail-article">
                        <Article />
                        <Comments />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailArticle;
