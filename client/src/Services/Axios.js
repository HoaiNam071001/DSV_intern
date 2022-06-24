import axios from 'axios';

const API_SERVER_URL = 'http://localhost:3060';

const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${window.localStorage.getItem('jwt') ?? ''}`,
    },
};

// export const setAuthorization = (token) => {
//     axios.defaults.headers.common['Authorization'] = token;
// };

export const API = {
    login: (data) =>
        axios.post(`${API_SERVER_URL}/api/users/login`, data, config),

    register: (data) => axios.post(`${API_SERVER_URL}/api/users`, data, config),

    getUser: () => axios.get(`${API_SERVER_URL}/api/user`, config),

    updateUser: (data) => axios.put(`${API_SERVER_URL}/api/user`, data, config),

    getProfile: (username) =>
        axios.get(`${API_SERVER_URL}/api/profiles/${username}`, config),

    followUser: (username) =>
        axios.post(
            `${API_SERVER_URL}/api/profiles/${username}/follow`,
            {},
            config
        ),

    unfollowUser: (username) =>
        axios.delete(
            `${API_SERVER_URL}/api/profiles/${username}/follow`,
            config
        ),

    getArticlesFeed: (limit = 20, offset = 0) =>
        axios.get(
            `${API_SERVER_URL}/api/articles/feed?limit=${limit}&offset=${offset}`,
            config
        ),

    getArticles: (query = null) =>
        axios.get(
            query
                ? API_SERVER_URL +
                      '/api/articles?' +
                      (query.tag ? 'tag=' + query.tag : '') +
                      (query.author ? '&author=' + query.author : '') +
                      (query.favorited ? '&favorited=' + query.favorited : '') +
                      '&limit=' +
                      (query.limit ?? 20) +
                      '&offset=' +
                      (query.offset ?? 0)
                : API_SERVER_URL + '/api/articles',
            config
        ),
    createArticle: (data) =>
        axios.post(`${API_SERVER_URL}/api/articles`, data, config),

    getArticle: (slug) =>
        axios.get(`${API_SERVER_URL}/api/articles/${slug}`, config),

    updateArticle: (data) =>
        axios.put(
            `${API_SERVER_URL}/api/articles/${data.slug}`,
            { article: data.article },
            config
        ),

    deleteArticle: (slug) =>
        axios.delete(`${API_SERVER_URL}/api/articles/${slug}`, {}, config),

    getComments: (slug) =>
        axios.get(`${API_SERVER_URL}/api/articles/${slug}/comments`, config),

    createComment: (slug, data) =>
        axios.post(
            `${API_SERVER_URL}/api/articles/${slug}/comments`,
            data,
            config
        ),

    deleteComment: (slug, id) =>
        axios.delete(
            `${API_SERVER_URL}/api/articles/${slug}/comments/${id}`,
            {},
            config
        ),

    favoriteArticle: (slug) =>
        axios.post(
            `${API_SERVER_URL}/api/articles/${slug}/favorite`,
            {},
            config
        ),

    unfavoriteArticle: (slug) =>
        axios.delete(`${API_SERVER_URL}/api/articles/${slug}/favorite`, config),

    getTags: () => axios.get(`${API_SERVER_URL}/api/tags`, config),
};
