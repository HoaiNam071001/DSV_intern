import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTags, selectIsLoading, selectTags } from './tagsSlice';
import { Loading2 } from '../Loading';
import TagItem from './tagItem';

function TagsSidebar() {
    const dispatch = useDispatch();
    const tags = useSelector(selectTags);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        const fetchTags = dispatch(getAllTags());
        return () => {
            fetchTags.abort();
        };
    }, [dispatch]);

    return (
        <React.Fragment>
            <div className="tag-title fs-3">Popular Tags</div>
            <div className="tag-container">
                {isLoading ? (
                    <Loading2 />
                ) : (
                    tags?.map((tag) => <TagItem tag={tag} key={tag} />)
                )}
            </div>
        </React.Fragment>
    );
}

export default TagsSidebar;
