import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../common/utils';
import { API } from '../../Services/Axios';

const initialState = {
    status: Status.IDLE,
    tags: [],
};

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllTags.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getAllTags.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.tags = action.payload.tags;
            });
    },
});

export const getAllTags = createAsyncThunk('tags/getAllTags', async () => {
    const result = await API.getTags();
    const tags = result.data;
    return tags;
});

const selectTagsState = (state) => state.tags;

export const selectTags = (state) => selectTagsState(state).tags;

export const selectIsLoading = (state) => selectTagsState(state).status === Status.LOADING;

export default tagsSlice.reducer;
