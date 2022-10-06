const db = require("../src/config/db.config");
const tables = require("../src/tables");

const users = require("./seed/users.json");
const posts = require("./seed/posts.json");
const categories = require("./seed/categories.json");
const comments = require("./seed/comments.json");
const likes = require("./seed/likes.json");
const postCategories = require("./seed/postCategories.json");

const mockDatabase = async () => {
	await tables.Users.bulkCreate(users, {
		ignoreDuplicates: true,
	}).catch((error) => console.log(error));
	await tables.Posts.bulkCreate(posts, {
		ignoreDuplicates: true,
	}).catch((error) => console.log(error));
	await tables.Categories.bulkCreate(categories, {
		ignoreDuplicates: true,
	}).catch((error) => console.log(error));
	await tables.PostCategories.bulkCreate(postCategories, {
		ignoreDuplicates: true,
	}).catch((error) => console.log(error));
	await tables.Comments.bulkCreate(comments, {
		ignoreDuplicates: true,
	}).catch((error) => console.log(error));
	await tables.Likes.bulkCreate(likes, {
		ignoreDuplicates: true,
	}).catch((error) => console.log(error));
};

module.exports = mockDatabase;
