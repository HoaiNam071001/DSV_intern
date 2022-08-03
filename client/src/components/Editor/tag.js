import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
let isEmpty = /^ *$/;

const TagEditor = ({ tagList, setTagList }) => {
    const [tagIn, setTagin] = useState('');
    const handleTab = (e) => {
        if (isEmpty.test(tagIn)) {
            setTagin('');
            return;
        }
        if (e.keyCode == 9) {
            e.preventDefault();
            if (tagIn && !tagList.includes(tagIn.trim())) setTagList([...tagList, tagIn.trim()]);
            setTagin('');
        }
    };
    const removeTag = (tag) => {
        const fileterOldTag = (tagList) => tagList.filter((value) => value !== tag);
        setTagList((pre) => fileterOldTag(pre));
    };
    return (
        <>
            <TextField
                sx={{
                    '& .MuiOutlinedInput-root': {
                        background: '#fff',
                        fontSize: 20,
                    },
                    '& label': { fontSize: 20 },
                }}
                label="Enter Tag"
                variant="outlined"
                multiline
                maxRows={4}
                value={tagIn}
                onChange={(e) => setTagin(e.target.value)}
                onKeyDown={handleTab}
                inputProps={{ maxLength: 30 }}
            />
            <div className="d-flex">
                {tagList.map((tag) => {
                    return (
                        <div key={tag} className="px-2 py-1 mx-1 tag-item-article d-flex">
                            {tag}
                            <div className="" onClick={() => removeTag(tag)}>
                                <ClearIcon />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default TagEditor;
