const db = require("../config/db.config");
const { DataTypes } = require("sequelize");
const LikesTemplate = db.define(
	"likes",
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		type: {
			type: DataTypes.ENUM("like", "dislike"),
			allowNull: false,
			defaultValue: "like",
		},
		post_id: {
			type: DataTypes.UUID,
			allowNull: true,
		},
		comment_id: {
			type: DataTypes.UUID,
			allowNull: true,
		},
	},
	{
		db,
		tableName: "likes",
		timestamps: true,
		underscored: true,
		indexes: [
			{
				name: "PRIMARY",
				unique: true,
				using: "BTREE",
				fields: [{ name: "user_id" }],
			},
			{
				name: "post_id",
				using: "BTREE",
				fields: [{ name: "post_id" }],
			},
		],
	}
);

module.exports = LikesTemplate;
