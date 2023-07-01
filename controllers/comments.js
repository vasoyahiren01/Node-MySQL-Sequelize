const db = require("../models");
const commentObj = db.comments;
const Op = db.Sequelize.Op;

// Create and save new Comment
exports.create = (request, result) => {
  if (!request.body.comment) {
    result.status(400).send({
      message: "Content cannot be empty"
    });
  }

  // Save Comment object to db
  commentObj.create({
    comment: request.body.comment,
    commentId: request.body.commentId,
    commentType: request.body.commentType,
    commentBy: request.body.commentBy
  }).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Some error occurred while saving."
    });
  });
};


// Retrieve all Comment (Receive data with condition).
exports.getAllComments = (request, result) => {
  commentObj.findAndCountAll({
    // paranoid: false // get soft deleted comment also
  }).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Some error occurred while retrieving data."
    });
  });
};

// Delete Comment by ID
exports.delete = async (request, response) => {
  let { id } = request.body;
  const deleteComment = await commentObj.destroy({
    where: { id },
    // truncate: true // delete all data from table
  });

  if (!deleteComment) return response.send({ message: `Cannot delete Comment object with id=${id}!` });

  return response.send({ message: "Comment successfully deleted." });

};

// Restore Comment by ID
exports.restore = async (request, response) => {
  let { id } = request.body;
  const restoreComment = await commentObj.restore({
    where: { id },
  });

  if (!restoreComment) return response.send({ message: `Cannot resore Comment object with id=${id}!` });

  return response.send({ message: "Comment successfully restore." });

};
