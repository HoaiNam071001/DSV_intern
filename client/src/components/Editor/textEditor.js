import React from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = ({ body, setBody }) => {
    return (
        <div className="mb-4 text-body">
            <JoditEditor
                value={body}
                onBlur={(e) => setBody(e)}
                tabIndex={1}
                config={{
                    placeholder: 'Write Your Article . . .',
                    readonly: false,
                }}
            />
        </div>
    );
};

export default TextEditor;
