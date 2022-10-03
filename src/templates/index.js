const UsersTemplate = require("./users");
const PostsTemplate = require("./posts");
const CategoriesTemplate = require("./categories");
const PostCategoriesTemplate = require("./postCategories");
const CommentsTemplate = require("./comments");
const LikesTemplate = require("./likes");

/**
 * Users template connections
 */

UsersTemplate.hasMany(PostsTemplate, {
	foreignKey: { name: "user_id", allowNull: false },
});
PostsTemplate.belongsTo(UsersTemplate);

UsersTemplate.hasMany(CommentsTemplate, {
	foreignKey: {
		name: "user_id",
		allowNull: false,
	},
});
CommentsTemplate.belongsTo(UsersTemplate);

/**
 * Posts template connections
 */

PostsTemplate.hasMany(CommentsTemplate, {
	foreignKey: {
		name: "post_id",
		allowNull: false,
	},
});
CommentsTemplate.belongsTo(PostsTemplate);

PostsTemplate.belongsToMany(CategoriesTemplate, {
	through: PostCategoriesTemplate,
	foreignKey: {
		name: "post_id",
		allowNull: false,
	},
});

/**
 * Categories template connections
 */

CategoriesTemplate.belongsToMany(PostsTemplate, {
	through: PostCategoriesTemplate,
	foreignKey: {
		name: "category_id",
		allowNull: false,
	},
});

UsersTemplate.hasMany(LikesTemplate, {
	foreignKey: {
		name: "user_id",
		allowNull: false,
	},
});
LikesTemplate.belongsTo(UsersTemplate);
PostsTemplate.hasMany(LikesTemplate, {
	foreignKey: {
		name: "post_id",
		allowNull: false,
	},
});
LikesTemplate.belongsTo(PostsTemplate);

CommentsTemplate.hasMany(LikesTemplate, {
	foreignKey: {
		name: "comment_id",
		allowNull: false,
	},
});
LikesTemplate.belongsTo(CommentsTemplate);

module.exports = {
	PostsTemplate,
	UsersTemplate,
	CategoriesTemplate,
	CommentsTemplate,
	PostCategoriesTemplate,
	LikesTemplate,
};
