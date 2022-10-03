const handlers = require("../helpers/handlers");
const UsersModel = require("../models/users");
const { createLink, deletePreviousFile } = require("../middleware/avatar");

const loadUser = async (id, callback) => {
	const user = await UsersModel.retrieveOne({ id }, callback);
	if (user) {
		return callback(
			null,
			handlers.responseHandler(true, 200, "User successfully loaded", user)
		);
	}

	return callback(
		handlers.responseHandler(false, 400, "No user with such id", null),
		null
	);
};

const retrieveAll = async (callback) => UsersModel.retrieveAll(callback);

const retrieveOne = async (id, callback) => {
	const user = await UsersModel.retrieveOneWithInfo(id);
	await UsersModel.addViewsId(id);
	callback(
		null,
		handlers.responseHandler(true, 200, "User successfully loaded", user)
	);
};

const updateAvatar = async ({ user, avatarName }, callback) => {
	const avatar = createLink(avatarName);
	const id = user.id;
	await UsersModel.updateAvatar(id, avatar);
	deletePreviousFile(user);
	callback(
		null,
		handlers.responseHandler(true, 200, "Avatar upload successful", null)
	);
};

const removeUser = async (id, callback) => {
	await UsersModel.removeUser({ id });
	callback(
		null,
		handlers.responseHandler(true, 200, "User removed successfully", null)
	);
};

const updateUser = async (params, callback) => {
	const rawData = params.data;
	const newData = {
		...(rawData.login ? { login: rawData.login } : {}),
		...(rawData.email ? { email: rawData.email } : {}),
		...(rawData.email ? { isEmailVerified: 0 } : {}),
		...(rawData.fullName ? { fullName: rawData.fullName } : {}),
		...(rawData.profilePicture
			? { profilePicture: rawData.profilePicture }
			: {}),
	};
	await UsersModel.updateUser(params.id, newData);
	const newUser = await UsersModel.retrieveOne({ id: params.id }, callback);
	callback(
		null,
		handlers.responseHandler(true, 200, "User data update successful", newUser)
	);
};

module.exports = {
	loadUser,
	retrieveAll,
	retrieveOne,
	updateAvatar,
	removeUser,
	updateUser,
};
