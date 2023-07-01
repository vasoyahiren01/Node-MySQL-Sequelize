let Joi = require('joi')

const createPost = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	published: Joi.boolean().default(false).optional(),
	publisher: Joi.number().required()
});

const postList = Joi.object({
	limit: Joi.number().default(20).optional(),
	currentPage: Joi.number().default(1).optional(),
	search: Joi.string().allow("").optional()
});

const postInfo = Joi.object({
	id: Joi.number().required()
});


module.exports = {
	createPost,
	postList,
	postInfo
}