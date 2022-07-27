import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API } from '../../Services/Axios';
import { profilePageUnloaded } from './profileSlice';
const initialState = {
    articles: null,
    pagination: null,
    articlesPerPage: 5,
    tab: undefined,
    tag: undefined,
    author: undefined,
    favorited: undefined,
};

const articleListSlice = createSlice({
    name: 'articleList',
    initialState,
    reducers: {
        homePageUnloaded: () => initialState,
        changenewTab: (state, action) => {
            state.tab = action.payload;
            delete state.tag;
        },
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

        builder
            .addCase(getAllArticles.fulfilled, (state, action) => {
                state.articles = action.payload.articles;
                state.pagination = action.payload.pagination;
            })
            .addCase(getAllArticles.pending, (state) => {
                state.articles = null;
            });

        builder
            .addCase(getArticlesByTag.fulfilled, (state, action) => {
                state.articles = action.payload.articles;
                state.pagination = action.payload.pagination;
                state.tag = action.meta.arg?.tag;
            })
            .addCase(getArticlesByTag.pending, (state) => {
                state.articles = null;
            });

        builder
            .addCase(getArticlesByAuthor.fulfilled, (state, action) => {
                state.articles = action.payload.articles;
                state.pagination = action.payload.pagination;
                state.author = action.meta.arg?.author;
                state.favorited = undefined;
            })
            .addCase(getArticlesByAuthor.pending, (state) => {
                state.articles = null;
            });

        builder
            .addCase(getFavoriteArticles.fulfilled, (state, action) => {
                state.articles = action.payload.articles;
                state.pagination = action.payload.pagination;
                state.favorited = action.meta.arg?.favorited;
                state.author = undefined;
            })
            .addCase(getFavoriteArticles.pending, (state) => {
                state.articles = null;
            });
        builder.addMatcher(
            (action) => [profilePageUnloaded.type].includes(action.type),
            () => initialState
        );
    },
});

export const { homePageUnloaded, changenewTab } = articleListSlice.actions;
export const changeTab = (tab) => (dispatch) => {
    dispatch(articleListSlice.actions.changenewTab(tab));
    return dispatch(getAllArticles());
};
export const getAllArticles = createAsyncThunk(
    'articleList/getAll',
    async ({ page = 1, author, tag, favorited } = {}, thunkApi) => {
        const articleList = thunkApi.getState().articleList;
        const offset = (page - 1) * (articleList.articlesPerPage ?? 10);
        const result =
            thunkApi.getState().articleList.tab === 'feed'
                ? await API.getArticlesFeed(Number(articleList.articlesPerPage) ?? 10, offset)
                : await API.getArticles({
                      author: author ?? articleList.author,
                      tag: tag ?? articleList.tag,
                      favorited: favorited ?? articleList.favorited,
                      limit: articleList.articlesPerPage ?? 10,
                      offset,
                  });
        const { articles, pagination } = result.data;
        return { articles, pagination };
    }
);

export const getArticlesByAuthor = createAsyncThunk(
    'articleList/getArticlesByAuthor',
    async ({ author, page = 1 }, thunkApi) => {
        const limit = thunkApi.getState().articleList.articlesPerPage ?? 10,
            offset = (page - 1) * limit;
        const result = await API.getArticles({ limit, offset, author });
        const { articles, pagination } = result.data;
        return { articles, pagination };
    }
);

export const getArticlesByTag = createAsyncThunk(
    'articleList/getArticlesByTag',
    async ({ tag, page = 1 }, thunkApi) => {
        const limit = thunkApi.getState().articleList.articlesPerPage,
            offset = (page - 1) * limit;
        const result = await API.getArticles({ limit, offset, tag });
        const { articles, pagination } = result.data;
        return { articles, pagination };
    }
);

export const getFavoriteArticles = createAsyncThunk(
    'articleList/getFavoriteArticles',
    async ({ favorited, page = 1 }, thunkApi) => {
        const limit = thunkApi.getState().articleList.articlesPerPage,
            offset = (page - 1) * limit;
        const result = await API.getArticles({
            limit,
            offset,
            favorited,
        });
        const { articles, pagination } = result.data;
        return { articles, pagination };
    }
);

export const favoriteArticle = createAsyncThunk('articleList/favoriteArticle', async (title) => {
    const result = await API.favoriteArticle(title);
    const articles = result.data;
    return articles;
});

export const unfavoriteArticle = createAsyncThunk(
    'articleList/unfavoriteArticle',
    async (title) => {
        const result = await API.unfavoriteArticle(title);
        const articles = result.data;
        return articles;
    }
);

export const selectarticleListSlice = (state) => state.articleList;

export const selectArticles = (state) => selectarticleListSlice(state).articles;
export const selectByTag = (state) => selectarticleListSlice(state).tag;
export const selectArticlePagination = (state) => selectarticleListSlice(state).pagination;
export default articleListSlice.reducer;
