import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { API } from '../../Services/Axios';
import { failureReducer, isApiError, Status } from '../../common/utils';

const initialState = {
    status: Status.IDLE,
    statusUpdate: Status.IDLE,
};

function successReducer(state, action) {
    state.status = Status.SUCCESS;
    state.token = action.payload?.token;
    state.user = action.payload?.user;
    delete state.errors;
}
function successUpdateReducer(state, action) {
    state.statusUpdate = Status.SUCCESS;
    state.token = action.payload?.token;
    state.user = action.payload?.user;
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
        setIdle(state) {
            delete state.statusUpdate;
            state.status = Status.IDLE;
            delete state.errors;
        },
        translate: (state) => (state.errors = undefined),
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, successReducer)
            .addCase(register.fulfilled, successReducer)
            .addCase(getUser.fulfilled, successReducer)
            .addCase(updateUser.fulfilled, successUpdateReducer);
        builder
            .addCase(updateUser.pending, (state) => {
                state.statusUpdate = Status.LOADING;
            })
            .addCase(login.pending, (state) => {
                state.errors = null;
                state.status = Status.LOADING;
            })
            .addCase(register.pending, (state) => {
                state.errors = null;
                state.status = Status.LOADING;
            })
            .addCase(getUser.pending, (state) => {
                state.status = Status.LOADING;
            });
        builder
            .addCase(login.rejected, failureReducer)
            .addCase(register.rejected, failureReducer)
            .addCase(updateUser.rejected, failureReducer)
            .addCase(getUser.rejected, (state) => {
                state.status = Status.FAILURE;
            });
    },
});
export const { setToken, logout, translate, setIdle } = authSlice.actions;

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
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkApi) => {
    try {
        const result = await API.login({ user: { email, password } });
        const {
            user: { token, ...user },
        } = result.data;
        return { token, user };
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});

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
        return thunkApi.rejectWithValue(error.response.status);
    }
});

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async ({ email, username, bio, image, password, oldpassword }, thunkApi) => {
        try {
            const result = await API.updateUser({
                user: {
                    email,
                    username,
                    bio,
                    image,
                    password,
                    oldpassword,
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

// Get auth slice
export const selectAuthSlice = (state) => state.auth;
export const selectToken = (state) => selectAuthSlice(state).token;

// Get current user
export const selectUser = (state) => selectAuthSlice(state).user;

// Get errors
export const selectErrors = (state) => selectAuthSlice(state).errors;

// Get is loading
export const selectIsLoading = (state) => selectAuthSlice(state).status === Status.LOADING;

// Get is success
export const selectIsSuccess = (state) => selectAuthSlice(state).status === Status.SUCCESS;
export const selectIsError = (state) => selectAuthSlice(state).status === Status.FAILURE;

export const selectIsSuccessUpdate = (state) =>
    selectAuthSlice(state).statusUpdate === Status.SUCCESS;

// Get is authenticated
export const selectIsAuthenticated = createSelector(
    (state) => selectAuthSlice(state).token,
    selectUser,
    (token, user) => Boolean(token && user)
);

export default authSlice.reducer;
