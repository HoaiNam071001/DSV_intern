import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Formik, Form } from 'formik';

import { selectIsLoading } from '../../redux/reducers/authSlice';
import { Input } from './input';
import { initprofile, objProfile } from './value';

const ChangeProfile = ({ currentUser, onSaveSettings }) => {
    const isLoading = useSelector(selectIsLoading);
    return (
        <div disabled={isLoading}>
            <Formik
                initialValues={initprofile(currentUser)}
                validationSchema={objProfile}
                onSubmit={(user, { setSubmitting }) => {
                    onSaveSettings(user);
                    setSubmitting(true);
                }}
            >
                <Form className="text-center">
                    <Box
                        sx={{
                            '& .MuiTextField-root': {
                                my: 2,
                                width: '100%',
                            },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="admin@gmail.com"
                        />
                        <Input
                            label="Username"
                            name="username"
                            type="text"
                            placeholder="Enter my username"
                        />
                        <Input
                            label="URL of profile picture"
                            name="image"
                            type="text"
                            placeholder="Enter URL picture"
                        />
                        <Input
                            label="Short Bio about you"
                            name="bio"
                            type="text"
                            placeholder="Short Bio about you"
                        />
                    </Box>

                    <button className="btn-submit-sign" type="submit">
                        Update Profile
                    </button>
                </Form>
            </Formik>
        </div>
    );
};
export default ChangeProfile;
