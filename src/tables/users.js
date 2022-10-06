const db = require("../config/db.config");
const { DataTypes, Sequelize } = require("sequelize");
const genProfilePicture = (index) =>
	`https://secure.gravatar.com/avatar/${index}?s=164&d=identicon`;
const Users = db.define(
	"users",
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		login: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: "login",
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: "email",
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		fullName: {
			type: DataTypes.STRING(100),
		},
		rating: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			defaultValue: 0,
		},
		profilePicture: {
			type: DataTypes.STRING(255),
			defaultValue: function () {
				return genProfilePicture(Math.ceil(Math.random() * 100));
			},
			allowNull: false,
		},
		views: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		isEmailVerified: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		tokenInvalidationDate: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
		role: {
			type: DataTypes.ENUM("admin", "user"),
			allowNull: false,
			defaultValue: "user",
		},
	},
	{
		db,
		underscored: true,
		tableName: "users",
		timestamps: true,
		indexes: [
			{
				name: "PRIMARY",
				unique: true,
				using: "BTREE",
				fields: [{ name: "id" }],
			},
			{
				name: "login",
				unique: true,
				using: "BTREE",
				fields: [{ name: "login" }],
			},
		],
	}
);

module.exports = Users;
