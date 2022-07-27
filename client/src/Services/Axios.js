import axios from 'axios';

const config = {
    baseURL: process.env.REACT_APP_SERVER,
    headers: {
        'Content-Type': 'application/json',
    },
};
export const setAuthorization = (token) => {
    axios.defaults.headers.common['Authorization'] = token ? 'Token ' + token : '';
};

export const API = {
    login: (data) => axios.post(`/api/users/login`, data, config),

    register: (data) => axios.post(`/api/users`, data, config),

    getUser: () => axios.get(`/api/user`, config),

    updateUser: (data) => axios.put(`/api/user`, data, config),

    getProfile: (username) => axios.get(`/api/profiles/${username}`, config),

    followUser: (username) => axios.post(`/api/profiles/${username}/follow`, {}, config),

    unfollowUser: (username) => axios.delete(`/api/profiles/${username}/follow`, config),

    getArticlesFeed: (limit = 10, offset = 0) =>
        axios.get(`/api/articles/feed?limit=${limit}&offset=${offset}`, config),

    getArticles: (query = null) =>
        axios.get(
            query
                ? '/api/articles?' +
                      'limit=' +
                      (query.limit ?? 10) +
                      '&offset=' +
                      (query.offset ?? 0) +
                      (query.tag ? '&tag=' + query.tag : '') +
                      (query.author ? '&author=' + query.author : '') +
                      (query.favorited ? '&favorited=' + query.favorited : '')
                : '/api/articles',
            config
        ),
    createArticle: (data) => axios.post(`/api/articles`, data, config),

    getArticle: (slug) => axios.get(`/api/articles/${slug}`, config),

    updateArticle: (data) =>
        axios.put(`/api/articles/${data.slug}`, { article: data.article }, config),

    deleteArticle: (slug) => axios.delete(`/api/articles/${slug}`, config),

    getComments: (slug) => axios.get(`/api/articles/${slug}/comments`, config),

    createComment: (slug, data) => axios.post(`/api/articles/${slug}/comments`, data, config),

    deleteComment: (slug, id) => axios.delete(`/api/articles/${slug}/comments/${id}`, config),

    favoriteArticle: (slug) => axios.post(`/api/articles/${slug}/favorite`, {}, config),

    unfavoriteArticle: (slug) => axios.delete(`/api/articles/${slug}/favorite`, config),

    getTags: () => axios.get(`/api/tags`, config),

    getRooms: () => axios.get(`/api/messenger`, config),

    getbyUser: (data) => axios.post(`/api/messenger/user`, data, config),

    getbyRoom: (data) => axios.post(`/api/messenger/room`, data, config),

    Search: (data) => axios.get(`/api/search?keyword=${data}`, config),
};
