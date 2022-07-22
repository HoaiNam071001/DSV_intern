import React, { memo } from 'react';
import { selectarticleListSlice } from '../../redux/reducers/articleListSlice';
import { useSelector } from 'react-redux';
import ArticleItem from './articleItem';
import Pagination from '../pagination/pagination';
import Skeleton from './skeletonlist';
const Articles = () => {
    const { articles } = useSelector(selectarticleListSlice);
    return (
        <div className="feed-container">
            <div className="list-article">
                {!articles ? (
                    <Skeleton />
                ) : articles.length === 0 ? (
                    <div className="text-center fs-3">No articles are here... yet.</div>
                ) : (
                    articles.map((article) => <ArticleItem key={article.slug} article={article} />)
                )}
            </div>
            {articles && <Pagination />}
        </div>
    );
};

export default memo(Articles);
