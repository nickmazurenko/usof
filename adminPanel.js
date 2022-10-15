const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
const bcrypt = require("bcryptjs");
const db = require("./src/config/db.config");
const Users = require("./src/tables/users");
const config = require("./src/config/keys.config");
// const session = require('express-session');
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

// const store = new SequelizeStore({
//     db: db,
//     table: "Session",
//     expiration: 1000 * 60 * 10,
//     checkExpirationInterval: 1000 * 60 * 2
// });

// store.sync();

const authenticate = async (login, password) => {
	const target = await Users.findOne({ where: { login: login } });
	if (
		!target ||
		target.role !== "admin" ||
		bcrypt.compareSync(password, target.password) === false
	) {
		return;
	}
	return Promise.resolve(target.login);
};

AdminJS.registerAdapter({
	Resource: AdminJSSequelize.Resource,
	Database: AdminJSSequelize.Database,
});

const adminOptions = {
	databases: [db],
	branding: {
		companyName: "Usof Admin Panel",
	},
	locale: {
		translations: {
			properties: {
				email: "Login",
			},
		},
	},
};

const admin = new AdminJS(adminOptions);
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
	admin,
	{
		authenticate,
		cookiePassword: config.JWT.SECRET,
	},
	null,
	{
		secret: config.JWT.SECRET,
		resave: false,
		saveUninitialized: false,
	}
);

module.exports = { admin, adminRouter };
