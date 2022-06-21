import {
    createAsyncThunk,
    createSlice,
    createSelector,
} from '@reduxjs/toolkit';
import { API } from '../../Services/Axios';
import { failureReducer, isApiError, Status } from '../../common/utils';

const initialState = {
    status: Status.IDLE,
};

function successReducer(state, action) {
    state.status = Status.SUCCESS;
    state.token = action.payload.token;
    state.user = action.payload.user;
    delete state.errors;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
        setToken(state, action) {
            state.token = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, successReducer)
            .addCase(register.fulfilled, successReducer)
            .addCase(getUser.fulfilled, successReducer)
            .addCase(updateUser.fulfilled, successReducer);

        builder
            .addCase(login.rejected, failureReducer)
            .addCase(register.rejected, failureReducer)
            .addCase(updateUser.rejected, failureReducer);
    },
});

export const register = createAsyncThunk(
    'auth/register',
    async ({ username, email, password }, thunkApi) => {
        try {
            const result = await API.register({
                user: { username, email, password },
            });
            const {
                user: { token, ...user },
            } = result.data;

            return { token, user };
        } catch (error) {
            if (isApiError(error.response.data)) {
                return thunkApi.rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkApi) => {
        try {
            const result = await API.login({ user: { email, password } });
            const {
                user: { token, ...user },
            } = result.data;
            return { token, user };
        } catch (error) {
            if (isApiError(error.response.data)) {
                return thunkApi.rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);

/**
 * Send a get current user request
 */
export const getUser = createAsyncThunk('auth/getUser', async () => {
    try {
        const result = await API.getUser();
        const {
            user: { token, ...user },
        } = result.data;

        return { token, user };
    } catch (error) {
        console.log(error);
        //window.localStorage.removeItem('jwt');
    }
});

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async ({ email, username, bio, image, password }, thunkApi) => {
        try {
            const result = await API.updateUser({
                user: {
                    email,
                    username,
                    bio,
                    image,
                    password,
                },
            });
            const {
                user: { token, ...user },
            } = result.data;

            return { token, user };
        } catch (error) {
            if (isApiError(error.response.data)) {
                return thunkApi.rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);

export const { setToken, logout } = authSlice.actions;

// Get auth slice
const selectAuthSlice = (state) => state.auth;

// Get current user
export const selectUser = (state) => selectAuthSlice(state).user;

// Get errors
export const selectErrors = (state) => selectAuthSlice(state).errors;

// Get is loading
export const selectIsLoading = (state) =>
    selectAuthSlice(state).status === Status.LOADING;

// Get is success
export const selectIsSuccess = (state) =>
    selectAuthSlice(state).status === Status.SUCCESS;

// Get is authenticated
export const selectIsAuthenticated = createSelector(
    (state) => selectAuthSlice(state).token,
    selectUser,
    (token, user) => Boolean(token && user)
);

export default authSlice.reducer;