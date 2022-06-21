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
