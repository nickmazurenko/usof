const db = require("../config/db.config");
const { DataTypes } = require("sequelize");

const PostsTemplate = db.define(
	"posts",
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		views: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		status: {
			type: DataTypes.ENUM("active", "inactive"),
			allowNull: false,
			defaultValue: "active",
		},
	},
	{
		db,
		tableName: "posts",
		underscored: true,
		timestamps: true,
		indexes: [
			{
				name: "PRIMARY",
				unique: true,
				using: "BTREE",
				fields: [{ name: "id" }],
			},
			{
				name: "user_id",
				using: "BTREE",
				fields: [{ name: "user_id" }],
			},
		],
	}
);

module.exports = PostsTemplate;
