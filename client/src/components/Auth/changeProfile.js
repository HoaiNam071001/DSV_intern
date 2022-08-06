import React from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/reducers/authSlice';
import Form, { Input } from './form';
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
                <Form>
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
                        label="Short Bio about you"
                        name="bio"
                        type="text"
                        placeholder="Short Bio about you"
                    />
                    <button className="btn-submit-sign" type="submit">
                        Update Profile
                    </button>
                </Form>
            </Formik>
        </div>
    );
};
export default ChangeProfile;
