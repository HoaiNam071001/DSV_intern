// import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';

// import { isApiError, Status } from '../../common/utils';
// import { API } from '../../Services/Axios';

// const initialState = {
//     status: Status.IDLE,
//     user: null,
// };

// const messengerSlice = createSlice({
//     name: 'messenger',
//     initialState,
//     reducers: {
//         chatPageUnloaded: () => initialState,
//     },
//     extraReducers(builder) {
//         builder.addCase(getMessenger.pending, (state, action) => {}).addCase(getChat.fulfilled, (state, action) => {});
//     },
// });
// export const { chatPageUnloaded } = chatSlice.actions;

// export const getMessenger = createAsyncThunk(
//     'messenger/getMessenger',
//     async ({ articleSlug, comment: newComment }, thunkApi) => {
//         try {
//             const result = await API.createComment(articleSlug, {
//                 comment: newComment,
//             });
//             const { comment } = result.data;
//             return comment;
//         } catch (error) {
//             if (isApiError(error)) {
//                 return thunkApi.rejectWithValue(error);
//             }

//             throw error;
//         }
//     }
// );

// export default messengerSlice.reducer;
