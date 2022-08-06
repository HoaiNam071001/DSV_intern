import * as Yup from 'yup';
export const initSignUp = {
    username: '',
    email: '',
    password: '',
    confirm: '',
};
export const objSignUp = Yup.object({
    username: Yup.string()
        .max(40, 'Username must be between 3 and 40 characters long.')
        .min(3, 'Username must be between 3 and 40 characters long.')
        .required('Please enter Username'),
    email: Yup.string().email('Invalid email address').required('Please enter Email'),
    password: Yup.string()
        .max(40, 'Password must be between 5 and 40 characters long.')
        .min(5, 'Password must be between 5 and 40 characters long.')
        .required('Please enter Password'),
    confirm: Yup.string().when('password', (password, schema) =>
        password
            ? schema.test('password', 'Password mismatched', (value) => value === password)
            : schema.required('Confirm Password is Required')
    ),
});
export const initSignIn = {
    email: '',
    password: '',
};

export const objSignIn = Yup.object({
    email: Yup.string().email('Invalid email address').required('Please enter Email'),
    password: Yup.string().required('Please enter Password'),
});

export const initprofile = (props) => {
    return {
        username: props?.username ?? '',
        bio: props?.bio ?? '',
        email: props?.email ?? '',
    };
};
export const objProfile = Yup.object({
    username: Yup.string()
        .max(40, 'Username must be between 3 and 40 characters long.')
        .min(3, 'Username must be between 3 and 40 characters long.')
        .required('Please enter Username'),
    email: Yup.string().email('Invalid email address').required('Please enter Email'),
    bio: Yup.string().max(100, 'Username must most 100 characters.'),
});

export const initPass = {
    oldpassword: '',
    password: '',
    confirm: '',
};
export const objPass = Yup.object({
    oldpassword: Yup.string().required('Please enter Old Password'),
    password: Yup.string()
        .max(40, 'Password must be between 5 and 40 characters long.')
        .min(5, 'Password must be between 5 and 40 characters long.')
        .required('Please enter Password'),
    confirm: Yup.string().when('password', (password, schema) =>
        password
            ? schema.test('password', 'Password mismatched', (value) => value === password)
            : schema.required('Confirm Password is Required')
    ),
});
