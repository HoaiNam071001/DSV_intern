import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';

import { Status } from '../../common/utils';
import { selectUser } from './authSlice';
import { API } from '../../Services/Axios';

const commentAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = commentAdapter.getInitialState({
    status: Status.IDLE,
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        commentPageUnloaded: () => initialState,
    },
    extraReducers(builder) {
        builder
            .addCase(createComment.pending, (state, action) => {
                state.status = Status.LOADING;
                if (action.meta.arg.comment.body) {
                    commentAdapter.addOne(state, {
                        ...action.meta.arg.comment,
                        author: action.meta.author,
                        createdAt: Date.now(),
                        id: action.meta.requestId,
                    });
                }
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                commentAdapter.updateOne(state, {
                    id: action.meta.requestId,
                    changes: action.payload,
                });
                delete state.errors;
            })
            .addCase(createComment.rejected, (state, action) => {
                state.status = Status.FAILURE;
                state.errors = action.payload;
                commentAdapter.removeOne(state, action.meta.requestId);
            });

        builder.addCase(getCommentsForArticle.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            commentAdapter.setAll(state, action.payload);
        });

        builder
            .addCase(removeComment.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                commentAdapter.removeOne(state, action.meta.arg.commentId);
            })
            .addCase(removeComment.rejected, (state, action) => {
                state.status = Status.FAILURE;
                state.errors = action.payload;
            });
    },
});
export const { commentPageUnloaded } = commentsSlice.actions;

export const createComment = createAsyncThunk(
    'comments/createComment',
    async ({ articleSlug, comment: newComment }, thunkApi) => {
        try {
            const result = await API.createComment(articleSlug, {
                comment: newComment,
            });
            const { comment } = result.data;
            return comment;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.status);
        }
    },
    {
        getPendingMeta: (_, { getState }) => ({ author: selectUser(getState()) }),
    }
);

export const getCommentsForArticle = createAsyncThunk(
    'comments/getCommentsForArticle',
    async (articleSlug) => {
        const result = await API.getComments(articleSlug);
        const { comments } = result.data;
        return comments;
    }
);

export const removeComment = createAsyncThunk(
    'comments/removeComment',
    async ({ articleSlug, commentId }) => {
        await API.deleteComment(articleSlug, commentId);
    },
    {
        getPendingMeta: (_, { getState }) => ({ author: selectUser(getState()) }),
    }
);

const selectCommentsSlice = (state) => state.comments;

const commentSelectors = commentAdapter.getSelectors(selectCommentsSlice);

export const selectAllComments = commentSelectors.selectAll;

const selectCommentById = (commentId) => (state) => commentSelectors.selectById(state, commentId);

export const selectIsAuthor = (commentId) =>
    createSelector(
        selectCommentById(commentId),
        selectUser,
        (comment, currentUser) => currentUser?.username === comment?.author.username
    );

export const selectIsLoading = (state) => selectCommentsSlice(state).status === Status.LOADING;

export const selectErrors = (state) => selectCommentsSlice(state).errors;

export default commentsSlice.reducer;
