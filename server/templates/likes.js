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
				name: "user_id",
				using: "BTREE",
				fields: [{ name: "user_id" }],
			},
		],
	}
);

module.exports = LikesTemplate;
