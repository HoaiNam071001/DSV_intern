import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API } from '../../Services/Axios';

const initialState = {
    articles: [],
    articlesCount: 0,
    currentPage: 0,
    articlesPerPage: 10,
    tag: undefined,
    author: undefined,
    favorited: undefined,
};

const articleListSlice = createSlice({
    name: 'articleList',
    initialState,
    reducers: {
        homePageUnloaded: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(favoriteArticle.fulfilled, (state, action) => {
            state.articles = state.articles.map((article) =>
                article.slug === action.payload.article.slug
                    ? {
                          ...article,
                          favorited: action.payload.article.favorited,
                          favoritesCount: action.payload.article.favoritesCount,
                      }
                    : article
            );
        });

        builder.addCase(unfavoriteArticle.fulfilled, (state, action) => {
            state.articles = state.articles.map((article) =>
                article.slug === action.payload.article.slug
                    ? {
                          ...article,
                          favorited: action.payload.article.favorited,
                          favoritesCount: action.payload.article.favoritesCount,
                      }
                    : article
            );
        });

        builder.addCase(getAllArticles.fulfilled, (state, action) => ({
            articles: action.payload.articles,
            articlesCount: action.payload.articlesCount,
            currentPage: action.meta.arg?.page ?? 0,
            author: undefined,
            favorited: undefined,
            tag: undefined,
        }));

        builder.addCase(getArticlesByTag.fulfilled, (state, action) => ({
            articles: action.payload.articles,
            articlesCount: action.payload.articlesCount,
            currentPage: action.meta.arg?.page ?? 0,
            tag: action.meta.arg?.tag,
            author: undefined,
            favorited: undefined,
            articlesPerPage: 10,
        }));

        builder.addCase(getArticlesByAuthor.fulfilled, (_, action) => ({
            articles: action.payload.articles,
            articlesCount: action.payload.articlesCount,
            currentPage: action.meta.arg?.page ?? 0,
            author: action.meta.arg?.author,
            tag: undefined,
            favorited: undefined,
            articlesPerPage: 5,
        }));

        builder.addCase(getFavoriteArticles.fulfilled, (_, action) => ({
            articles: action.payload.articles,
            articlesCount: action.payload.articlesCount,
            currentPage: action.meta.arg?.page ?? 0,
            favorited: action.meta.arg?.username,
            author: undefined,
            tag: undefined,
            articlesPerPage: 5,
        }));
    },
});

export const { homePageUnloaded } = articleListSlice.actions;

export const getAllArticles = createAsyncThunk(
    'articleList/getAll',
    async (feed = 0, thunkApi) => {
        try {
            const result =
                feed === 0
                    ? await API.getArticlesFeed()
                    : await API.getArticles();
            const { articles, articlesCount } = result.data;
            return { articles, articlesCount };
        } catch (error) {
            console.log(error);
        }
    }
);

export const getArticlesByAuthor = createAsyncThunk(
    'articleList/getArticlesByAuthor',
    async ({ author }, thunkApi) => {
        try {
            const result = await API.getArticles({ author });
            const { articles, articlesCount } = result.data;
            return { articles, articlesCount };
        } catch (error) {
            console.log(error);
        }
    }
);

export const getArticlesByTag = createAsyncThunk(
    'articleList/getArticlesByTag',
    async ({ tag }, thunkApi) => {
        try {
            const result = await API.getArticles({ tag });
            const { articles, articlesCount } = result.data;
            return { articles, articlesCount };
        } catch (error) {
            console.log(error);
        }
    }
);

export const getFavoriteArticles = createAsyncThunk(
    'articleList/getFavoriteArticles',
    async ({ username }, thunkApi) => {
        try {
            const result = await API.getArticles({ favorited: username });
            const { articles, articlesCount } = result.data;
            return { articles, articlesCount };
        } catch (error) {
            console.log(error);
        }
    }
);

export const favoriteArticle = createAsyncThunk(
    'articleList/favoriteArticle',
    async (title, thunkApi) => {
        try {
            const result = await API.favoriteArticle(title);
            const articles = result.data;
            return articles;
        } catch (error) {
            console.log(error);
        }
    }
);

export const unfavoriteArticle = createAsyncThunk(
    'articleList/unfavoriteArticle',
    async (title, thunkApi) => {
        try {
            const result = await API.unfavoriteArticle(title);
            const articles = result.data;
            return articles;
        } catch (error) {
            console.log(error);
        }
    }
);

const selectarticleListSlice = (state) => state.articleList;

export const selectArticles = (state) => selectarticleListSlice(state).articles;
export const selectByTag = (state) => selectarticleListSlice(state).tag;

export default articleListSlice.reducer;
