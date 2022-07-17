import { configureStore } from '@reduxjs/toolkit';
import { localStorageMiddleware } from './middleware';

import authSlice from './reducers/authSlice';
import articlesSlice from './reducers/articleListSlice';
import tagsSlice from './reducers/tagsSlice';
import profileSlice from './reducers/profileSlice';
import articleSlice from './reducers/articleSlice';
import commentsSlice from './reducers/commentsSlice';
import roomsSlice from './reducers/roomSlice';
import messengerSlice from './reducers/messengerSlice';
export function makeStore(preloadedState) {
    return configureStore({
        reducer: {
            auth: authSlice,
            articleList: articlesSlice,
            tags: tagsSlice,
            profile: profileSlice,
            article: articleSlice,
            comments: commentsSlice,
            room: roomsSlice,
            messenger: messengerSlice,
        },
        devTools: true,
        preloadedState,
        middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), localStorageMiddleware],
    });
}

const store = makeStore();

export default store;
