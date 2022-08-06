export const Status = {
    /** The initial state */
    IDLE: 'idle',
    /** The loading state */
    LOADING: 'loading',
    /** The success state */
    SUCCESS: 'success',
    /** The error state */
    FAILURE: 'failure',
};

export function isApiError(error) {
    return typeof error === 'object' && error !== null && 'errors' in error;
}

export function loadingReducer(state) {
    state.status = Status.LOADING;
}

export function failureReducer(state, action) {
    state.status = Status.FAILURE;
    state.errors = action.payload.errors;
}

export function saveImage(thumbnail) {
    const data = new FormData();
    data.append('file', thumbnail);
    data.append('upload_preset', 'h5z4ewnk');
    data.append('api_key', '441634564439267');
    return fetch('https://api.cloudinary.com/v1_1/h5z4ewnk/image/upload', {
        method: 'post',
        body: data,
    }).then((resp) => resp.json());
}
