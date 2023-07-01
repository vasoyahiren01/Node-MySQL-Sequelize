let Joi = require('joi')

const createTag = Joi.object({
	name: Joi.string().required()
});

const assignTag = Joi.object({
	tagId: Joi.number().required(),
	mediaId: Joi.number().required(),
	mediaType: Joi.string().required(),
});


const tagList = Joi.object({
	limit: Joi.number().default(20).optional(),
	currentPage: Joi.number().default(1).optional(),
	search: Joi.string().allow("").optional()
});


module.exports = {
	createTag,
	assignTag,
	tagList
}