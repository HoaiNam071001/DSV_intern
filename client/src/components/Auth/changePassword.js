import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { selectIsLoading } from '../../redux/reducers/authSlice';
import Form, { InputPassword } from './form';
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
                <Form>
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
                    <button className="btn-submit-sign" type="submit">
                        Update Password
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default ChangePassword;
