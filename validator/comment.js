let Joi = require('joi')

const createComment = Joi.object({
	comment: Joi.string().required(),
	commentId: Joi.number().required(),
	commentType: Joi.string().required(),
	commentBy: Joi.number().optional(),
});

const commentList = Joi.object({
	limit: Joi.number().default(20).optional(),
	currentPage: Joi.number().default(1).optional(),
	search: Joi.string().allow("").optional()
});

const deleteComment = Joi.object({
	id: Joi.number().required()
});

const restoreComment = Joi.object({
	id: Joi.number().required()
});

module.exports = {
	createComment,
	commentList,
	deleteComment,
	restoreComment
}