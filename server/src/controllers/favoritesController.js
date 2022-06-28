const UserModel = require("../models/User");
const ArticleModel = require("../models/Article");
const FollowModel = require("../models/Follow");
const { validationResult } = require("express-validator");

const Favorite = (() => {
  const favorite = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const clientId = req.query.token._id,
        slug_article = req.params.slug_article;
      var isfavorite = null,
        isfollow = null,
        Author = null;

      // check user
      const client = await UserModel.findById(clientId);
      if (!client) throw "User not valid";
      // check article
      const article = await ArticleModel.findOne({ slug: slug_article });
      if (!article) throw "Article not valid";

      // check if article is favorite
      isfavorite = article.Favorite.find((res) => res === clientId);
      if (isfavorite) throw "Article already favorited";

      // check if user is follow the author of the article
      Author = await UserModel.findById(article.IdAuthor);
      isfollow = await FollowModel.findOne({
        IdFollow: clientId,
        IdFollowed: Author._id,
      });

      //Update article
      await ArticleModel.updateOne(
        { _id: article._id },
        {
          Favorite: [...article.Favorite, clientId],
        }
      );
      const result = await ArticleModel.findOne({ _id: article._id });
      res.json({
        article: {
          slug: result.slug,
          title: result.Title,
          description: result.Description,
          body: result.Body,
          tagList: result.Tags,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
          favorited: true,
          favoritesCount: result.Favorite.length,
          author: {
            username: Author.username,
            bio: Author.bio,
            image: Author.avatar_img,
            following: isfollow ? true : false,
          },
        },
      });
    } catch (err) {
      res.status(422).json({ errors: { Favorite: [err] } });
    }
  };
  const unfavorite = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const clientId = req.query.token._id,
        slug_article = req.params.slug_article;
      var favorite_check = null,
        isfollow = null,
        Author = null;

      // check user
      const client = await UserModel.findById(clientId);
      if (!client) throw "User not valid";
      // check article
      const article = await ArticleModel.findOne({ slug: slug_article });
      if (!article) throw "Article not valid";

      // check if article is favorite
      favorite_check = article.Favorite.find((res) => res === clientId);
      if (!favorite_check) throw "Article is not favorited";

      // check if user is follow the author of the article
      Author = await UserModel.findById(article.IdAuthor);
      isfollow = await FollowModel.findOne({
        IdFollow: clientId,
        IdFollowed: Author._id,
      });

      //Update article
      favorite_check = article.Favorite.filter((res) => res != clientId);

      await ArticleModel.updateOne(
        { _id: article._id },
        { Favorite: favorite_check }
      );
      const result = await ArticleModel.findOne({ _id: article._id });
      res.json({
        article: {
          slug: result.slug,
          title: result.Title,
          description: result.Description,
          body: result.Body,
          tagList: result.Tags,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
          favorited: false,
          favoritesCount: result.Favorite.length,
          author: {
            username: Author.username,
            bio: Author.bio,
            image: Author.avatar_img,
            following: isfollow ? true : false,
          },
        },
      });
    } catch (err) {
      res.status(422).json({ errors: { Favorite: [err] } });
    }
  };

  return {
    favorite,
    unfavorite,
  };
})();

module.exports = Favorite;
