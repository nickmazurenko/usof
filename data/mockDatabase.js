const db = require("../src/config/db.config");
const templates = require("../src/templates");

const users = require("./seed/users.json");
const posts = require("./seed/posts.json");
const categories = require("./seed/categories.json");
const comments = require("./seed/comments.json");
const likes = require("./seed/likes.json");
const postCategories = require("./seed/postCategories.json");

const mockDatabase = async () => {
	await templates.UsersTemplate.bulkCreate(users, { ignoreDuplicates: true });
	await templates.PostsTemplate.bulkCreate(posts, { ignoreDuplicates: true });
	await templates.CategoriesTemplate.bulkCreate(categories),
		{ ignoreDuplicates: true };
	await templates.PostCategoriesTemplate.bulkCreate(postCategories, {
		ignoreDuplicates: true,
	});
	await templates.CommentsTemplate.bulkCreate(comments, { ignoreDuplicates: true });
	await templates.LikesTemplate.bulkCreate(likes, { ignoreDuplicates: true });
};

module.exports = mockDatabase;
