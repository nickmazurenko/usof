const db = require("../src/config/db.config");
const templates = require("../src/templates");

const users = require("./seed/users.json");
const posts = require("./seed/posts.json");
const categories = require("./seed/categories.json");
const comments = require("./seed/comments.json");
const likes = require("./seed/likes.json");
const postCategories = require("./seed/postCategories.json");

const mockDatabase = async () => {
	await templates.UsersTemplate.bulkCreate(users, {
		ignoreDuplicates: true,
	}).catch((error) => console.log(error));
	await templates.PostsTemplate.bulkCreate(posts, {
		ignoreDuplicates: true,
	}).catch((error) => console.log(error));
	await templates.CategoriesTemplate.bulkCreate(categories, {
		ignoreDuplicates: true,
	}).catch((error) => console.log(error));
	await templates.PostCategoriesTemplate.bulkCreate(postCategories, {
		ignoreDuplicates: true,
	}).catch((error) => console.log(error));
	await templates.CommentsTemplate.bulkCreate(comments, {
		ignoreDuplicates: true,
	}).catch((error) => console.log(error));
	await templates.LikesTemplate.bulkCreate(likes, {
		ignoreDuplicates: true,
	}).catch((error) => console.log(error));
};

module.exports = mockDatabase;
