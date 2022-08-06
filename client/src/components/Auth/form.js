import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import BadgeIcon from '@mui/icons-material/Badge';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import KeyIcon from '@mui/icons-material/Key';
import Box from '@mui/material/Box';
import { Form, useField } from 'formik';

const style = {
    height: 80,
    '& .MuiOutlinedInput-root': {
        background: '#fff',
        fontSize: 17,
        borderRadius: 2,
    },
    '& label': { fontSize: 17, fontWeight: 'bold' },
    '& input': { margin: '7px', padding: '10px' },
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
                            {props.name === 'username' && <BadgeIcon />}

                            {props.name === 'email' && <MarkAsUnreadIcon />}
                            {props.name === 'bio' && <AutoStoriesIcon />}
                        </InputAdornment>
                    ),
                }}
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
                    startAdornment: (
                        <InputAdornment position="start">
                            {props.name === 'confirm' ? <JoinInnerIcon /> : <KeyIcon />}
                        </InputAdornment>
                    ),
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
const FormBox = ({ children }) => {
    return (
        <Form className="text-center">
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

export default FormBox;
