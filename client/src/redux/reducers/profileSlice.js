import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../Services/Axios';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {},
    reducers: {
        profilePageUnloaded: () => ({}),
    },
    extraReducers: (builder) => {
        const successCaseReducer = (_, action) => ({
            ...action.payload.profile,
        });

        builder.addCase(getProfile.fulfilled, successCaseReducer);
        builder.addCase(follow.fulfilled, successCaseReducer);
        builder.addCase(unfollow.fulfilled, successCaseReducer);
    },
});
export const { profilePageUnloaded } = profileSlice.actions;

export const getProfile = createAsyncThunk(
    'profile/getProfile',
    async ({ username }) => {
        const result = await API.getProfile(username);
        const { profile } = result.data;
        return { profile };
    }
);

export const follow = createAsyncThunk(
    'profile/follow',
    async ({ username }) => {
        const result = await API.followUser(username);
        const { profile } = result.data;
        return { profile };
    }
);

export const unfollow = createAsyncThunk(
    'profile/unfollow',
    async ({ username }) => {
        const result = await API.unfollowUser(username);
        const { profile } = result.data;
        return { profile };
    }
);

export const selectProfile = (state) => state.profile;

export default profileSlice.reducer;
