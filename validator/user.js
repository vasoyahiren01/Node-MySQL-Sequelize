let Joi = require('joi')

const createUser = Joi.object({
	name: Joi.string().required(),
	address: Joi.string().required(),
	age: Joi.number().required(),
	email: Joi.string().required(),
	address: Joi.string().allow("").optional(),
	gender: Joi.string().optional(),
});

const updateUser = Joi.object({
	id: Joi.number().required(),
	name: Joi.string().required(),
	address: Joi.string().required(),
	age: Joi.number().required(),
	email: Joi.string().required(),
	address: Joi.string().allow("").optional(),
	gender: Joi.string().optional(),
});

const userList = Joi.object({
	limit: Joi.number().default(20).optional(),
	currentPage: Joi.number().default(1).optional(),
	search: Joi.string().allow("").optional()
});

const userInfo = Joi.object({
	id: Joi.number().required()
});

const deleteUser = Joi.object({
	id: Joi.number().required()
});

module.exports = {
	createUser,
	updateUser,
	userList,
	userInfo,
	deleteUser
}