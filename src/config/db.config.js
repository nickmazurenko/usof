const sequelize = require("sequelize");
const config = require("./keys.config");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

dotenv.config();

/**
 * Sequelize connection pool
 */
const db = new sequelize(
	config.DB.DATABASE,
	config.DB.USER,
	config.DB.PASSWORD,
	{
		dialect: "mysql",
		host: config.DB.HOST,
		logging: false,
		define: {
			timestamps: false,
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	}
);

(async () => {
	await mysql
		.createConnection({
			user: config.DB.USER,
			password: config.DB.PASSWORD,
		})
		.then((connection) => {
			connection.query(`CREATE DATABASE IF NOT EXISTS ${config.DB.DATABASE};`);
		});
	await db.sync();
	await require("../../data/mockDatabase")();
})();

module.exports = db;
