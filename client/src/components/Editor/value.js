import * as Yup from 'yup';

Yup.addMethod(Yup.string, 'validateEmptyString', function (errorMessage) {
    return this.test('validate-empty-string', errorMessage, function (value) {
        const { path, createError } = this;
        if (value !== undefined && value.trim() === '') {
            return createError({ path, message: errorMessage });
        }
        return true;
    });
});

export const objYup = Yup.object({
    title: Yup.string()
        .min(5, 'Title must be at least 5 characters.')
        .max(400, 'Title must most 400 characters.')
        .validateEmptyString('Title is Required')
        .required('Title is Required'),
    description: Yup.string()
        .min(3, 'Description must be at least 3 characters.')
        .max(500, 'Description must most 500 characters.')
        .validateEmptyString('Description is Required')
        .required('Description is Required'),
});
