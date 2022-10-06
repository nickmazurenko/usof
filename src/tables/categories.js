const db = require("../config/db.config");
const { DataTypes } = require("sequelize");

const Categories = db.define(
	"categories",
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		categoryTitle: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: "categoryTitle",
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		db,
		tableName: "categories",
		underscored: true,
		indexes: [
			{
				name: "PRIMARY",
				unique: true,
				using: "BTREE",
				fields: [{ name: "id" }],
			},
			{
				name: "categoryTitle",
				unique: true,
				using: "BTREE",
				fields: [{ name: "categoryTitle" }],
			},
		],
	}
);

module.exports = Categories;
