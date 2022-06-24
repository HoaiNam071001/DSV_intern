import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isApiError } from '../../common/utils';

import { API } from '../../Services/Axios';

const initialState = {
    article: undefined,
    inProgress: false,
    errors: undefined,
    success: undefined,
};

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        articlePageUnloaded: () => initialState,
        setSuccess: (state, action) => (state.success = undefined),
    },
    extraReducers: (builder) => {
        builder.addCase(getArticle.fulfilled, (state, action) => {
            state.article = action.payload.article;
            state.inProgress = false;
        });

        builder.addCase(createArticle.fulfilled, (state) => {
            state.inProgress = false;
            state.success = true;
        });

        builder.addCase(createArticle.rejected, (state, action) => {
            state.errors = action.error.errors;
            state.inProgress = false;
        });

        builder.addCase(updateArticle.fulfilled, (state) => {
            state.inProgress = false;
            state.success = true;
        });

        builder.addCase(updateArticle.rejected, (state, action) => {
            state.errors = action.error.errors;
            state.inProgress = false;
        });

        builder.addMatcher(
            (action) => action.type.endsWith('/pending'),
            (state) => {
                state.inProgress = true;
                state.success = undefined;
            }
        );

        builder.addDefaultCase((state) => {
            state.inProgress = false;
        });
    },
});

export const { articlePageUnloaded } = articleSlice.actions;
function serializeError(error) {
    if (error instanceof Error) {
        return {
            name: error.name,
            message: error.message,
            stack: error.stack,
            code: error.code,
        };
    }

    if (typeof error === 'object' && error !== null) {
        return error;
    }

    return { message: String(error) };
}

export const getArticle = createAsyncThunk(
    'article/getArticle',
    async ({ slug }, thunkApi) => {
        try {
            const result = await API.getArticle(slug);
            const { article } = result.data;
            return { article };
        } catch (error) {
            if (isApiError(error.response.data)) {
                return thunkApi.rejectWithValue(error.response.data);
            }
            throw error;
        }
    },
    { serializeError }
);

export const createArticle = createAsyncThunk(
    'article/createArticle',
    async (data, thunkApi) => {
        try {
            const result = await API.createArticle({ article: data });
            const { article } = result.data;
            return { article };
        } catch (error) {
            if (isApiError(error.response.data)) {
                return thunkApi.rejectWithValue(error.response.data);
            }
            throw error;
        }
    },
    { serializeError }
);

export const updateArticle = createAsyncThunk(
    'article/updateArticle',
    async (data, thunkApi) => {
        try {
            const result = await API.updateArticle(data);
            const { article } = result.data;
            return { article };
        } catch (error) {
            if (isApiError(error.response.data)) {
                return thunkApi.rejectWithValue(error.response.data);
            }
            throw error;
        }
    },
    { serializeError }
);
export const selectArticle = (state) => state.article;

export default articleSlice.reducer;
