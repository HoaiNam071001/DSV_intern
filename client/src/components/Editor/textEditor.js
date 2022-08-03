import React from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = ({ props }) => {
    return (
        <JoditEditor
            {...props}
            config={{
                placeholder: 'Write Your Article . . .',
                readonly: false,
            }}
        />
    );
};

export default TextEditor;
