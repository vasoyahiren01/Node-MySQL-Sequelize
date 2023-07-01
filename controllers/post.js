const db = require("../models");
const postObj = db.posts;
const Op = db.Sequelize.Op;

// Create and save new Post
exports.create = (request, result) => {
  if (!request.body.title) {
    result.status(400).send({
      message: "Content cannot be empty"
    });
  }

  // Create a Post object
  const post = {
    title: request.body.title,
    description: request.body.description,
    published: request.body.published ? request.body.published : false,
    publisher: request.body.publisher ? request.body.publisher : false
  };

  // Save Post object to db
  postObj.create(post).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Some error occurred while saving."
    });
  });
};

// Get User object by ID
exports.info = async (request, response) => {
  let { id } = request.body;

  const post = await postObj.findOne();
  console.log((await post.getCaptain()).toJSON());


  // const post = await postObj.findByPk(id); // find by primary key
  if (!post)
    return response.status(500).send({ message: `Some error occurred while retrieving data with id : ${id}` });
  else
    return response.send(post);
};

// Retrieve all Post (Receive data with condition).
exports.getAllPosts = (request, result) => {
  postObj.findAndCountAll({
    include: [
      { model: db.users },
      { model: db.tags },
    ]
  }).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Some error occurred while retrieving data."
    });
  });
};
