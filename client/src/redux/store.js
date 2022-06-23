import { configureStore } from '@reduxjs/toolkit';
import { localStorageMiddleware } from './middleware';

import authSlice from '../components/Auth/authSlice';
import articlesSlice from '../components/ArticlesList/articleListSlice';
import tagsSlice from '../components/Tags/tagsSlice';
import profileSlice from '../components/Profile/profileSlice';
import articleSlice from '../components/Article/articleSlice';

export function makeStore(preloadedState) {
    return configureStore({
        reducer: {
            auth: authSlice,
            articleList: articlesSlice,
            tags: tagsSlice,
            profile: profileSlice,
            article: articleSlice,
        },
        devTools: true,
        preloadedState,
        middleware: (getDefaultMiddleware) => [
            ...getDefaultMiddleware(),
            localStorageMiddleware,
        ],
    });
}

const store = makeStore();

export default store;
