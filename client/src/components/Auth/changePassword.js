import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Formik, Form } from 'formik';

import { selectIsLoading } from '../../redux/reducers/authSlice';
import { InputPassword } from './input';
import { initPass, objPass } from './value';
const ChangePassword = ({ onSaveSettings }) => {
    const isLoading = useSelector(selectIsLoading);

    return (
        <div disabled={isLoading}>
            <Formik
                initialValues={initPass}
                validationSchema={objPass}
                onSubmit={(pass, { setSubmitting }) => {
                    onSaveSettings(pass);
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
                        <InputPassword
                            label="Old Password"
                            name="oldpassword"
                            placeholder="Enter my old password"
                        />
                        <InputPassword
                            label="New Password"
                            name="password"
                            placeholder="Enter my new password"
                        />
                        <InputPassword
                            label="Confirm Password"
                            name="confirm"
                            placeholder="Confirm my password"
                        />
                    </Box>

                    <button className="btn-submit-sign float-end" type="submit">
                        Update Password
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default ChangePassword;
