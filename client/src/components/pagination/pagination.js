import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import { getAllArticles, selectarticleListSlice } from '../../redux/reducers/articleListSlice';
import { useDispatch, useSelector } from 'react-redux';
const Pagination = () => {
    const dispatch = useDispatch();
    const { pagination } = useSelector(selectarticleListSlice);
    const { totalCount, siblingCount = 1, currentPage, pageSize, className } = pagination;
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });
    const onPageChange = (current) => {
        dispatch(getAllArticles({ page: current }));
        document.getElementById('topscroll').scrollIntoView({ behavior: 'smooth' });
    };

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className={classnames('pagination-container', {
                [className]: className,
            })}
        >
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === 1,
                })}
                onClick={onPrevious}
            >
                <div className="arrow left" />
            </li>
            {paginationRange.map((pageNumber) => {
                if (pageNumber === DOTS) {
                    return <li className="pagination-item dots">&#8230;</li>;
                }

                return (
                    <li
                        key={pageNumber}
                        className={classnames('pagination-item', {
                            selected: pageNumber === currentPage,
                        })}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === lastPage,
                })}
                onClick={onNext}
            >
                <div className="arrow right" />
            </li>
        </ul>
    );
};

export default Pagination;
