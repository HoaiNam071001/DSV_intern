import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTags, selectIsLoading, selectTags } from '../../redux/reducers/tagsSlice';
import { Loading2 } from '../Loading';
import TagItem from './tagItem';
import StyleIcon from '@mui/icons-material/Style';

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
        <div className="tags-c">
            <div className="tag-title fs-3">
                <StyleIcon /> Popular Tags
            </div>
            <hr />
            <div className="tag-container">
                <div className="block-tags d-flex align-content-start flex-wrap">
                    {isLoading ? <Loading2 /> : tags.map((tag) => <TagItem tag={tag} key={tag} />)}
                </div>
            </div>
        </div>
    );
}

export default memo(TagsSidebar);
