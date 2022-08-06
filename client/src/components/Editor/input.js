import React from 'react';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';

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
                inputProps={{ maxLength: 300 }}
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
