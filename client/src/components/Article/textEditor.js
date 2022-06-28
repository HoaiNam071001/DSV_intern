import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};
const Text = ({ body, setBody }) => {
    return (
        <ReactQuill
            style={{ height: 200 }}
            theme="snow"
            modules={modules}
            value={body}
            onChange={setBody}
            placeholder={'Write something awesome...'}
        />
    );
};
export default Text;
