import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import { useField } from 'formik';

const style = {
    height: 80,
    '& .MuiOutlinedInput-root': {
        background: '#fff',
        fontSize: 17,
        borderRadius: 4,
    },
    '& label': { fontSize: 17 },
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
            />
        </>
    );
};

export const InputPassword = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const [visibility, setVisibility] = useState(true);
    return (
        <>
            <TextField
                sx={style}
                error={meta.touched && meta.error ? true : false}
                label={label}
                {...field}
                type={visibility ? 'password' : 'text'}
                {...props}
                variant="outlined"
                helperText={meta.touched ? meta.error : null}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setVisibility(!visibility)}
                                onMouseDown={(e) => e.preventDefault()}
                                edge="end"
                            >
                                {visibility ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </>
    );
};
