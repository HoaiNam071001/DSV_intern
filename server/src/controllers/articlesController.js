const { validationResult } = require('express-validator');
const ArticleModel = require('../models/Article');
const UserModel = require('../models/User');
const FollowModel = require('../models/Follow');

const Articles = (() => {
    const getRecentArticlesUser = async (req, res) => {
        try {
            const { limit = 20, offset = 0 } = req.query,
                client = req.query.token._id;
            var Author = null,
                isfavorite = null,
                FollowList = [],
                Articles = [],
                result = [];

            // Get data
            FollowList = await FollowModel.find({ IdFollow: client });

            for (var i = 0; i < FollowList.length; i++) {
                Articles = Articles.concat(
                    await ArticleModel.find({
                        IdAuthor: FollowList[i].IdFollowed,
                    })
                        .skip(offset)
                        .limit(limit),
                );
            }
            // config data
            for (var i = 0; i < Articles.length; i++) {
                Author = await UserModel.findById(Articles[i].IdAuthor);
                isfavorite = Articles[i].Favorite.find((res) => res === client);

                result.push({
                    slug: Articles[i].slug,
                    title: Articles[i].Title,
                    description: Articles[i].Description,
                    body: Articles[i].Body,
                    createdAt: Articles[i].createdAt,
                    updatedAt: Articles[i].updatedAt,
                    tagList: Articles[i].Tags,
                    favorited: isfavorite ? true : false,
                    favoritesCount: Articles[i].Favorite.length,
                    author: {
                        username: Author.username,
                        bio: Author.bio,
                        image: Author.avatar_img,
                        following: true,
                    },
                });
            }

            res.json({ articles: result, articlesCount: result.length });
        } catch (error) {
            res.status(422).json({ errors: { article: [error] } });
        }
    };

    const getRecentArticlesGlobal = async (req, res) => {
        try {
            const {
                    limit = 20,
                    offset = 0,
                    favorited,
                    tag,
                    author,
                } = req.query,
                client = req.query.token ? req.query.token._id : null;
            var Author = null,
                obj = {},
                isfollow = null,
                isfavorite = null,
                result = [];

            // Get data
            if (tag) obj.Tags = { $in: [tag] };
            if (author && favorited) {
                return res.json({
                    articles: [],
                    articlesCount: 0,
                });
            } else if (author) {
                Author = await UserModel.findOne({ usename: author });
                Author = String(Author._id);
                obj.IdAuthor = Author;
            } else if (favorited) {
                Author = await UserModel.findOne({ usename: favorited });
                Author = String(Author._id);
                obj.Favorite = { $in: [Author] };
            }
            const Articles = await ArticleModel.find(obj)
                .skip(offset)
                .limit(limit);

            // config data
            for (var i = 0; i < Articles.length; i++) {
                Author = await UserModel.findById(Articles[i].IdAuthor);
                isfollow = null;
                if (client)
                    isfollow = await FollowModel.findOne({
                        IdFollow: client,
                        IdFollowed: Articles[i].IdAuthor,
                    });
                isfavorite = client
                    ? Articles[i].Favorite.find((res) => res === client)
                    : null;
                result.push({
                    slug: Articles[i].slug,
                    title: Articles[i].Title,
                    description: Articles[i].Description,
                    body: Articles[i].Body,
                    createdAt: Articles[i].createdAt,
                    updatedAt: Articles[i].updatedAt,
                    tagList: Articles[i].Tags,
                    favorited: isfavorite ? true : false,
                    favoritesCount: Articles[i].Favorite.length,
                    author: {
                        username: Author.username,
                        bio: Author.bio,
                        image: Author.avatar_img,
                        following: isfollow ? true : false,
                    },
                });
            }

            res.json({ articles: result, articlesCount: result.length });
        } catch (error) {
            res.status(422).json({ errors: { article: [error] } });
        }
    };

    const createArticle = async (req, res) => {
        try {
            const client = req.query.token._id;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, body, tagList } = req.body.article;
            const article = new ArticleModel({
                IdAuthor: client,
                Title: title,
                Description: description,
                Body: body,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                Tags: tagList,
                Favorite: [],
            });
            const ArticleCur = await article.save();

            const Author = await UserModel.findById(client);
            const response = {
                article: {
                    slug: ArticleCur.slug,
                    title: ArticleCur.Title,
                    description: ArticleCur.Description,
                    body: ArticleCur.Body,
                    tagList: ArticleCur.Tags,
                    createdAt: ArticleCur.createdAt,
                    updatedAt: ArticleCur.updatedAt,
                    favorited: false,
                    favoritesCount: 0,
                    author: {
                        username: Author.username,
                        bio: Author.bio,
                        image: Author.avatar_img,
                        following: false,
                    },
                },
            };
            res.json(response);
        } catch (err) {
            res.status(422).json({ errors: { article: [err] } });
        }
    };
    const getArticle = async (req, res) => {
        try {
            const slug_article = req.params.slug_article,
                client = req.query.token ? req.query.token._id : null;
            var Author = null,
                isfollow = null,
                isfavorite = null;

            // Get data
            const Articles = await ArticleModel.findOne({
                slug: slug_article,
            });
            if (!Articles) throw 'Not Found Article!';
            // config data
            Author = await UserModel.findById(Articles.IdAuthor);
            isfollow = null;
            if (client)
                isfollow = await FollowModel.findOne({
                    IdFollow: client,
                    IdFollowed: Articles.IdAuthor,
                });
            isfavorite = client
                ? Articles.Favorite.find((res) => res === client)
                : null;
            const result = {
                articles: {
                    slug: Articles.slug,
                    title: Articles.Title,
                    description: Articles.Description,
                    body: Articles.Body,
                    createdAt: Articles.createdAt,
                    updatedAt: Articles.updatedAt,
                    tagList: Articles.Tags,
                    favorited: isfavorite ? true : false,
                    favoritesCount: Articles.Favorite.length,
                    author: {
                        username: Author.username,
                        bio: Author.bio,
                        image: Author.avatar_img,
                        following: isfollow ? true : false,
                    },
                },
            };

            res.json(result);
        } catch (error) {
            res.status(422).json({ errors: { article: [error] } });
        }
    };
    const updateArticle = async (req, res) => {
        try {
            const { title, description, body } = req.body.article,
                slug_article = req.params.slug_article,
                client = req.query.token._id;
            var Author = null,
                isfavorite = null,
                Articles;
            // Get data
            Articles = await ArticleModel.findOne({
                slug: slug_article,
            });

            if (!Articles) throw 'Not Found Article!';
            if (Articles.IdAuthor != client)
                throw 'missing authentication credentials!';
            Author = { _id: Articles._id };

            Articles = await ArticleModel.findOneAndUpdate(Author, {
                Title: title,
                Description: description,
                Body: body,
                updatedAt: Date.now(),
            });
            // config data
            Author = await UserModel.findById(Articles.IdAuthor);
            isfavorite = client
                ? Articles.Favorite.find((res) => res === client)
                : null;
            const result = {
                articles: {
                    slug: Articles.slug,
                    title: Articles.Title,
                    description: Articles.Description,
                    body: Articles.Body,
                    createdAt: Articles.createdAt,
                    updatedAt: Articles.updatedAt,
                    tagList: Articles.Tags,
                    favorited: isfavorite ? true : false,
                    favoritesCount: Articles.Favorite.length,
                    author: {
                        username: Author.username,
                        bio: Author.bio,
                        image: Author.avatar_img,
                        following: false,
                    },
                },
            };

            res.json(result);
        } catch (error) {
            res.status(422).json({ errors: { article: [error] } });
        }
    };
    const deleteArticle = async (req, res) => {
        try {
            const slug_article = req.params.slug_article,
                client = req.query.token._id;
            // Get data
            if (!slug_article) throw 'Request Not Valid!';
            const Articles = await ArticleModel.findOne({
                slug: slug_article,
            });

            if (!Articles) throw 'Not Found Article in database!';
            if (Articles.IdAuthor != client)
                throw 'missing authentication credentials!';

            await ArticleModel.deleteOne({
                slug: slug_article,
            });
            // config data

            res.json({});
        } catch (error) {
            res.status(422).json({ errors: { article: [error] } });
        }
    };
    return {
        getRecentArticlesUser,
        getRecentArticlesGlobal,
        createArticle,
        getArticle,
        updateArticle,
        deleteArticle,
    };
})();

module.exports = Articles;
