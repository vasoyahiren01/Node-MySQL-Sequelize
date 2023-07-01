let Joi = require('joi')

const createNews = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	published: Joi.boolean().default(false).optional(),
	publisher: Joi.number().required()
});

const newsList = Joi.object({
	limit: Joi.number().default(20).optional(),
	currentPage: Joi.number().default(1).optional(),
	search: Joi.string().allow("").optional()
});

const newsInfo = Joi.object({
	id: Joi.number().required()
});


module.exports = {
	createNews,
	newsList,
	newsInfo
}