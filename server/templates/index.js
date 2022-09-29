const UsersTemplate = require("./users");
const PostsTemplate = require("./posts");
const CategoriesTemplate = require("./categories");
const PostCategoriesTemplate = require("./postCategories");
const CommentsTemplate = require("./comments");
const AnswersTemplate = require("./answers");

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

UsersTemplate.hasMany(AnswersTemplate, {
	foreignKey: {
		name: "user_id",
		allowNull: false,
	},
});
AnswersTemplate.belongsTo(UsersTemplate);
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

PostsTemplate.hasMany(AnswersTemplate, {
	foreignKey: {
		name: "post_id",
		allowNull: false,
	},
});
AnswersTemplate.belongsTo(PostsTemplate);

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

module.exports = {
	PostsTemplate,
	UsersTemplate,
	CategoriesTemplate,
	AnswersTemplate,
	CommentsTemplate,
	PostCategoriesTemplate,
};
