const db = require("../models");
const newsObj = db.news;

// Create and save new News
exports.create = (request, result) => {
  if (!request.body.title) {
    result.status(400).send({
      message: "Content cannot be empty"
    });
  }

  // Create a News object
  const news = {
    title: request.body.title,
    description: request.body.description,
    published: request.body.published ? request.body.published : false,
    publisher: request.body.publisher ? request.body.publisher : false
  };

  // Save News object to db
  newsObj.create(news).then(data => {
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

  const news = await newsObj.findOne();
  console.log((await news.getCaptain()).toJSON());


  // const news = await newsObj.findByPk(id); // find by primary key
  if (!news)
    return response.status(500).send({ message: `Some error occurred while retrieving data with id : ${id}` });
  else
    return response.send(news);
};

// Retrieve all News (Receive data with condition).
exports.getAllNews = (request, result) => {
  newsObj.findAndCountAll({
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
