const user = require('./user');
const post = require('./post');
const news = require('./news');
const comment = require('./comment');
const tag = require('./tag');

const validation = (validation) => {
    return (req, res, next) => {
        const { error } = validation.validate(req.body);
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            console.log("error", message);
            res.status(422).json({ error: message })
        }
    }
}

module.exports = {
    validation,
    ...user,
    ...post,
    ...news,
    ...comment,
    ...tag
}