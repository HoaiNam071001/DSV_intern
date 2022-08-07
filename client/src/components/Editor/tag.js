import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import TagIcon from '@mui/icons-material/Tag';
import InputAdornment from '@mui/material/InputAdornment';

const TagEditor = ({ tagList, setTagList }) => {
    const [tagIn, setTagin] = useState('');
    const handleTab = (e) => {
        if (e.key === 'Enter') e.preventDefault();
        if (/^ *$/.test(tagIn)) {
            setTagin('');
            return;
        }
        if (e.keyCode == 9) {
            e.preventDefault();
            const isExist = tagList.findIndex(
                (tag) => tag.toLowerCase() === tagIn.trim().toLowerCase()
            );
            if (tagList.length < 5 && tagIn && isExist === -1)
                setTagList([...tagList, tagIn.trim()]);
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
                value={tagIn}
                onChange={(e) => setTagin(e.target.value)}
                onKeyDown={handleTab}
                inputProps={{ maxLength: 30 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <TagIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <div className="mx-1">List at most 5 tags</div>
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
