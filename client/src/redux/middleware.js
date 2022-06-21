import {
    login,
    logout,
    register,
    setToken,
} from '../components/Auth/authSlice';

const localStorageMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case register.fulfilled.type:
        case login.fulfilled.type:
            window.localStorage.setItem('jwt', action.payload.token);
            setToken(action.payload.token);
            break;

        case logout.type:
            window.localStorage.removeItem('jwt');
            logout(undefined);
            break;
        default:
    }

    return next(action);
};

export { localStorageMiddleware };
