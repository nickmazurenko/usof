const db = require("../config/db.config");

const PostCategories = db.define(
	"postCategories",
	{},
	{
		db,
		tableName: "postCategories",
		timestamps: true,
		underscored: true,
		indexes: [
			{
				name: "PRIMARY",
				unique: true,
				using: "BTREE",
				fields: [{ name: "post_id" }, { name: "category_id" }],
			},
			{
				name: "category_id",
				using: "BTREE",
				fields: [{ name: "category_id" }],
			},
		],
	}
);

module.exports = PostCategories;
