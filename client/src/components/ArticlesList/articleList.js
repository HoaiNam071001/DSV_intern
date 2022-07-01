import React from 'react';
import { selectarticleListSlice } from './articleListSlice';
import { useSelector } from 'react-redux';
import ArticleItem from './articleItem';
import Loading from '../Loading';
import Pagination from '../pagination/pagination';
const Articles = () => {
    const { articles } = useSelector(selectarticleListSlice);
    console.log(articles);
    if (!articles) return <Loading />;
    if (articles.length === 0)
        return (
            <div className="text-center fs-3">No articles are here... yet.</div>
        );
    return (
        <div className="feed-container">
            {articles.map((article) => (
                <ArticleItem key={article.slug} article={article} />
            ))}
            <div className="Pagination">
                <Pagination />
            </div>
        </div>
    );
};

export default Articles;
