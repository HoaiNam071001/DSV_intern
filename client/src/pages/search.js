import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchList from '../components/Search/searchList';
import Searchinput from '../components/Search/searchInput';

function Search() {
    const searchname = useLocation().search;
    const keyword = new URLSearchParams(searchname).get('k');
    return (
        <div className="search-containerpage container">
            <div className="row">
                <Searchinput />
                <div className="search-name">
                    Result for <strong>{keyword}</strong>
                </div>
                <hr />
                <SearchList keyword={keyword} />
            </div>
        </div>
    );
}

export default Search;
