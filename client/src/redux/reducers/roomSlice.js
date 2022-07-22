import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Status, failureReducer } from '../../common/utils';
import { API } from '../../Services/Axios';

const initialState = {
    status: Status.IDLE,
    rooms: [],
    errors: null,
};

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        roomUnloaded: () => initialState,
    },
    addRooms: (state, action) => {
        state.rooms = state.rooms.push(action.payload.room);
    },
    extraReducers(builder) {
        builder
            .addCase(getRooms.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getRooms.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.rooms = action.payload.rooms;
            })
            .addCase(getRooms.rejected, failureReducer);
    },
});
export const { roomUnloaded, updateRooms } = roomSlice.actions;

export const getRooms = createAsyncThunk('messenger/getRooms', async () => {
    const result = await API.getRooms();
    const { rooms } = result.data;
    return { rooms };
});
export const selectRooms = (state) => state.room;

export default roomSlice.reducer;
