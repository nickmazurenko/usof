const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
const bcrypt = require("bcryptjs");
const db = require("./src/config/db.config");
const Users = require("./src/tables/users");
const config = require("./src/config/keys.config");

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
		companyName: "usof admin panel",
	},
	locale: {
		translations: {
			properties: {
				email: "Email",
				role: "Role",
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
