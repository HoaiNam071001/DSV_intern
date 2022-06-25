import {
    login,
    logout,
    register,
    setToken,
} from '../components/Auth/authSlice';
import { setAuthorization } from '../Services/Axios';

const localStorageMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case register.fulfilled.type:
        case login.fulfilled.type:
            window.localStorage.setItem('jwt', action.payload.token);
            setToken(action.payload.token);
            setAuthorization(window.localStorage.getItem('jwt'));
            break;

        case logout.type:
            window.localStorage.removeItem('jwt');
            logout(undefined);
            setAuthorization('');
            break;
        default:
    }

    return next(action);
};

export { localStorageMiddleware };
