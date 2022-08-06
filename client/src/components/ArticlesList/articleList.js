import React, { memo } from 'react';
import { selectarticleListSlice } from '../../redux/reducers/articleListSlice';
import { useSelector } from 'react-redux';
import ArticleItem from './articleItem';
import Pagination from '../pagination/pagination';
import Skeleton from './skeletonlist';
const noItem = require('../../Assets/no-item.png');
const Articles = () => {
    const { articles } = useSelector(selectarticleListSlice);
    return (
        <div className="feed-container">
            <div className="list-article">
                {!articles ? (
                    <Skeleton />
                ) : articles.length === 0 ? (
                    <div className="text-center fs-3">
                        <img width="100%" src={noItem} />
                    </div>
                ) : (
                    articles.map((article) => <ArticleItem key={article.slug} article={article} />)
                )}
            </div>
            {articles && <Pagination />}
        </div>
    );
};

export default memo(Articles);
