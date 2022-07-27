import React from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = ({ body, setBody, style }) => {
    return (
        <JoditEditor
            value={body}
            config={style}
            //tabIndex={0}
            onBlur={(newContent) => setBody(newContent)}
        />
    );
};

export default TextEditor;
