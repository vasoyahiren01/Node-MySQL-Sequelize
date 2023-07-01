const db = require("../models");
const tagObj = db.tags;
const assignObj = db.assignTags;

// Create and save new Tags
exports.create = (request, result) => {
  // Create a Tags object
  const tag = {
    name: request.body.name
  };

  // Save Tags object to db
  tagObj.create(tag).then(async data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Some error occurred while saving."
    });
  });
};

// Assign tags
exports.assignTags = (request, result) => {
  const assignTag = {
    tagId: request.body.tagId,
    mediaId: request.body.mediaId,
    mediaType: request.body.mediaType,
  };

  // assign Tags object to db
  assignObj.create(assignTag).then(async data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Some error occurred while saving."
    });
  });
};

// Retrieve all Tags (Receive data with condition).
exports.getAllTags = (request, result) => {
  tagObj.findAndCountAll({
    include: [db.posts, db.news]
  }).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Some error occurred while retrieving data."
    });
  });
};
