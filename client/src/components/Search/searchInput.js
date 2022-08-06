import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';
const Searchnav = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');

    const handleSearch = () => {
        if (/^ *$/.test(input)) return;
        navigate(`/search?k=${input}`);
    };
    const handleEnter = (e) => {
        if (e.keyCode === 13) handleSearch();
    };
    return (
        <div className="search-container d-flex align-items-center ">
            <input
                placeholder="Enter Username or Email"
                type="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleEnter}
            />
            <button onClick={handleSearch}>
                <SearchIcon />
            </button>
        </div>
    );
};
export default Searchnav;
