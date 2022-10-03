const db = require("../src/config/db.config");
const templates = require("../src/templates");

var users = [];

$.getJSON("js/settings.json", (data) => {
	templates.UsersTemplate.bulkCreate(data);
});
