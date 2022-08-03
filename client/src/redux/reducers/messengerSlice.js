import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { isApiError, Status, failureReducer } from '../../common/utils';
import { API } from '../../Services/Axios';
const initialState = {
    status: Status.IDLE,
    messenger: null,
    room: null,
    lastId: null,
    limit: 20,
    count: null,
    createdAtLast: null,
};
const resetState = (state) => {
    state.status = Status.LOADING;
    state.messenger = null;
    state.room = null;
    state.lastId = null;
    state.count = null;
    state.createdAtLast = null;
};
const successReducer = (state, action) => {
    state.status = Status.SUCCESS;
    state.count = action.payload.count;
    if (state.messenger) {
        state.messenger.pop();
        state.messenger = state.messenger.concat(action.payload.messenger);
    } else state.messenger = action.payload.messenger;
    state.room = action.payload.room;
    state.createdAtLast = action.payload.messenger
        ? action.payload.messenger[action.payload.messenger?.length - 1]?.createdAt
        : null;
};
const messengerSlice = createSlice({
    name: 'messenger',
    initialState,
    reducers: {
        messUnloaded: () => initialState,
        messUnUser: (state) => resetState(state),
        addMessage: (state, action) => {
            const { roomId, message } = action.payload;
            if ((roomId && roomId === state.room?.id) || !roomId) {
                // if (message?.sender.id === state.room?.members.id) {
                //     message.sender.image = state.room.members.image;
                // }
                state.messenger = message ? [message, ...state.messenger] : state.messenger;
            }
        },
        updateMessage: (state, action) => {
            state.messenger = state.messenger
                ? state.messenger.map((message) =>
                      message.id === action.payload.id ? action.payload.message : message
                  )
                : state.messenger;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getMessByUser.fulfilled, successReducer)
            .addCase(getMessByRoom.fulfilled, successReducer);
        builder
            .addCase(getMessByUser.rejected, failureReducer)
            .addCase(getMessByRoom.rejected, failureReducer);
    },
});
export const { messUnloaded, messUnUser, addMessage, updateMessage } = messengerSlice.actions;

export const getMessByUser = createAsyncThunk(
    'messenger/getMessByUser',
    async ({ userId, next = false }, thunkApi) => {
        try {
            const result = await API.getbyUser({
                userId,
                limit: thunkApi.getState().messenger.limit,
                where: next ? thunkApi.getState().messenger.createdAtLast : null,
            });
            const { room, messenger, count } = result.data;
            return { room, messenger, count };
        } catch (error) {
            if (isApiError(error.response.data)) {
                return thunkApi.rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);
export const getMessByRoom = createAsyncThunk(
    'messenger/getMessByRoom',
    async ({ roomId, next = false }, thunkApi) => {
        try {
            const result = await API.getbyRoom({
                roomId,
                limit: thunkApi.getState().messenger.limit,
                where: next ? thunkApi.getState().messenger.createdAtLast : null,
            });
            const { room, messenger, count } = result.data;
            return { room, messenger, count };
        } catch (error) {
            if (isApiError(error.response.data)) {
                return thunkApi.rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);
export const selectMessages = (state) => state.messenger;
export const selectRoom = (state) => selectMessages(state).room;

export default messengerSlice.reducer;
