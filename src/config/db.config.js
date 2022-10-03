const sequelize = require("sequelize");
const config = require("./keys.config");
const dotenv = require("dotenv");

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
		logging: true,
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

(async () => await db.sync())();

module.exports = db;
