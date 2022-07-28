import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isApiError } from '../../common/utils';

import { API } from '../../Services/Axios';

const initialState = {
    article: undefined,
    inProgress: false,
    errors: undefined,
    success: undefined,
    deleted: undefined,
};

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        articlePageUnloaded: () => initialState,
        setSuccess: (state) => (state.success = undefined),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArticle.fulfilled, (state, action) => {
                state.errors = undefined;
                state.article = action.payload.article;
                state.inProgress = false;
            })
            .addCase(createArticle.fulfilled, (state) => {
                state.errors = undefined;
                state.inProgress = false;
                state.success = true;
            })
            .addCase(updateArticle.fulfilled, (state) => {
                state.errors = undefined;
                state.inProgress = false;
                state.success = true;
            })
            .addCase(deleteArticle.fulfilled, (state) => {
                state.deleted = true;
            })
            .addCase(follow.fulfilled, (state, action) => {
                state.article.author.following = action.payload.profile.following;
            })
            .addCase(unfollow.fulfilled, (state, action) => {
                state.article.author.following = action.payload.profile.following;
            })
            .addCase(favorite.fulfilled, (state, action) => {
                state.article = action.payload.article;
            })
            .addCase(unfavorite.fulfilled, (state, action) => {
                state.article = action.payload.article;
            });

        builder
            .addCase(getArticle.rejected, (state, action) => {
                state.errors = action.error.code;
                state.inProgress = false;
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.errors = action.error.errors;
                state.inProgress = false;
            })
            .addCase(updateArticle.rejected, (state, action) => {
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

export const deleteArticle = createAsyncThunk(
    'article/deleteArticle',
    async (data, thunkApi) => {
        try {
            await API.deleteArticle(data);
            return {};
        } catch (error) {
            if (isApiError(error.response.data)) {
                return thunkApi.rejectWithValue(error.response.data);
            }
            throw error;
        }
    },
    { serializeError }
);

export const follow = createAsyncThunk('article/follow', async ({ username }) => {
    const result = await API.followUser(username);
    const { profile } = result.data;
    return { profile };
});

export const unfollow = createAsyncThunk('article/unfollow', async ({ username }) => {
    const result = await API.unfollowUser(username);
    const { profile } = result.data;
    return { profile };
});
export const favorite = createAsyncThunk('article/favorite', async (title) => {
    const result = await API.favoriteArticle(title);
    const article = result.data;
    return article;
});

export const unfavorite = createAsyncThunk('article/unfavorite', async (title) => {
    const result = await API.unfavoriteArticle(title);
    const article = result.data;
    return article;
});
export const selectArticle = (state) => state.article;

export default articleSlice.reducer;
