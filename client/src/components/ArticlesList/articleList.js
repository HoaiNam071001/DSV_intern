import React, { memo } from 'react';
import { selectarticleListSlice } from '../../redux/reducers/articleListSlice';
import { useSelector } from 'react-redux';
import ArticleItem from './articleItem';
import Loading from '../Loading';
import Pagination from '../pagination/pagination';
const Articles = () => {
    const { articles } = useSelector(selectarticleListSlice);
    return (
        <div className="feed-container">
            <div className="list-article">
                {!articles ? (
                    <Loading />
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
