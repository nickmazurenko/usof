const multer = require("multer");
const config = require("../config/keys.config");
const fs = require("fs");
const storageConfig = multer.diskStorage({
	destination: (request, file, callback) => {
		callback(null, "public/avatars");
	},
	filename: (request, file, callback) => {
		callback(null, request.user.id + "-" + Date.now() + ".png");
	},
});

const fileFilter = (request, file, callback) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg"
	) {
		callback(null, true);
	} else {
		callback(null, false);
	}
};

const upload = multer({
	storage: storageConfig,
	fileFilter: fileFilter,
});

const createLink = (file) => {
	return `${config.SERVER.LINK + config.SERVER.PORT}/avatars/${file}`;
};

const deletePreviousFile = (user) => {
	const avatarLink = user.profilePicture;
	const file = avatarLink.slice(avatarLink.lastIndexOf("/"));
	fs.unlink(`./public/avatars/${file}`, (error) => {
		if (error) {
			console.log(error);
		}
	});
};

module.exports = { upload, createLink, deletePreviousFile };
