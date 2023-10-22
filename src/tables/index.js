const Users = require('./users');
const Posts = require('./posts');
const Categories = require('./categories');
const PostCategories = require('./postCategories');
const Comments = require('./comments');
const Likes = require('./likes');

/**
 * Users template connections
 */

Users.hasMany(Posts, {
  foreignKey: { name: 'user_id', allowNull: false },
});
Posts.belongsTo(Users);

Users.hasMany(Comments, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});
Comments.belongsTo(Users);

/**
 * Posts template connections
 */

Posts.hasMany(Comments, {
  foreignKey: {
    name: 'post_id',
    allowNull: true,
  },
});
Comments.belongsTo(Posts);

Comments.hasMany(Comments, {
  foreignKey: {
    name: 'comment_id',
    allowNull: true,
  },
});
Comments.belongsTo(Comments);

Posts.belongsToMany(Categories, {
  through: PostCategories,
  foreignKey: {
    name: 'post_id',
    allowNull: false,
  },
});

/**
 * Categories template connections
 */

Categories.belongsToMany(Posts, {
  through: PostCategories,
  foreignKey: {
    name: 'category_id',
    allowNull: false,
  },
});

Users.hasMany(Likes, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});
Likes.belongsTo(Users);
Posts.hasMany(Likes, {
  foreignKey: {
    name: 'post_id',
    allowNull: false,
  },
});
Likes.belongsTo(Posts);

Comments.hasMany(Likes, {
  foreignKey: {
    name: 'comment_id',
    allowNull: false,
  },
});
Likes.belongsTo(Comments);

module.exports = {
  Posts,
  Users,
  Categories,
  Comments,
  PostCategories,
  Likes,
};
