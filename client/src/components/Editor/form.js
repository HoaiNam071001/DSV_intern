import React from 'react';
import TextField from '@mui/material/TextField';
import { useField, Form } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';
import Box from '@mui/material/Box';
import { createArticle, updateArticle } from '../../redux/reducers/articleSlice';
import Loading from '../Loading';

export const submitForm = (dispatch, slug, values, body, tagList, thumbnail) => {
    const article = {
        title: values.title,
        description: values.description,
        body,
        tagList,
        thumbnail,
    };
    dispatch(slug ? updateArticle({ slug, article }) : createArticle(article));
};
export const Button = ({ isSubmit, slug }) => {
    return (
        <button
            className="btn-submit-editor rounded-pill p-2 m-3 float-end"
            disabled={isSubmit}
            type="submit"
        >
            {isSubmit ? <Loading /> : slug ? 'Update' : 'Create Article'}
        </button>
    );
};

const style = {
    height: 80,
    '& .MuiOutlinedInput-root': {
        background: '#fff',
        fontSize: 17,
        borderRadius: 2,
    },
    '& label': { fontSize: 17, fontWeight: 'bold' },
};
export const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <TextField
                sx={style}
                error={meta.touched && meta.error ? true : false}
                label={label}
                {...field}
                {...props}
                variant="outlined"
                helperText={meta.touched ? meta.error : null}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {props.name === 'title' ? <TitleIcon /> : <DescriptionIcon />}
                        </InputAdornment>
                    ),
                }}
            />
        </>
    );
};
const FormEditor = ({ children }) => {
    return (
        <Form>
            <Box
                sx={{
                    '& .MuiTextField-root': { my: 2, width: '100%' },
                }}
                noValidate
                autoComplete="off"
            >
                {children}
            </Box>
        </Form>
    );
};

export default FormEditor;
