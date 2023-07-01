const db = require("../models");
const userObj = db.users;
const Op = db.Sequelize.Op;
const sequelize = require("sequelize");

// Create and save new User
exports.create = async (request, response) => {
  let { name, address, age, email, gender } = request.body;

  /* const t = sequelize.transaction()
  try {
    let createUser = await userObj.create({ name, address, age, email, gender }, {
      transaction: t
    });
    t.commit();
  } catch (error) {
    t.rollback();
  }
  return response.send('ok'); */

  // Save user object to db
  let createUser = await userObj.create({ name, address, age, email, gender });
  if (!createUser) return response.status(500).send({ message: "Some error occurred while saving." });

  return response.send(createUser);
};

// Update a user object by the id
exports.update = async (request, response) => {
  let { id, name, address, age, email, gender } = request.body;
  let updateUser = await userObj.update({ name, address, age, email, gender }, { where: { id } });

  if (updateUser?.[0] == 1)
    return response.send({ message: "User successfully updated." });
  else
    return response.send({ message: `Cannot update User object with id=${id}!` });
};

// Retrieve all List (Receive data with condition).
exports.list = async (request, response) => {
  const { limit, currentPage, search } = request.body;
  const offset = currentPage == 1 ? 0 : (currentPage - 1) * limit;
  let where = {}
  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { address: { [Op.like]: `%${search}%` } },
    ]
  }

  let list = await userObj.findAndCountAll({
    offset,
    limit,
    where,
    attributes: ['id', 'name', 'address', 'isDeleted', 'age', 'createdAt'], // filter keys
    order: [['createdAt', 'DESC']]
  });

  if (!list) return response.status(500).send({ message: "Some error occurred while retrieving data." });

  return response.send(list);
};

// Get User object by ID
exports.info = async (request, response) => {
  let { id } = request.body;

  // const user = await userObj.findByPk(id); // find by primary key
  const user = await userObj.findOne({
    where: { id: id },
    include: [{ required: true, model: db.posts }]
  });
  if (!user)
    return response.status(500).send({ message: `Some error occurred while retrieving data with id : ${id}` });
  else
    return response.send(user);
};


// Delete USer by ID
exports.delete = async (request, response) => {
  let { id } = request.body;
  const deleteUser = await userObj.destroy({
    where: { id },
    // truncate: true // delete all data from table
  });

  if (!deleteUser) return response.send({ message: `Cannot delete User object with id=${id}!` });

  return response.send({ message: "User successfully deleted." });

};

// Retrieve all List (Receive data with condition).
exports.userWithPost = async (request, response) => {
  const { limit, currentPage, search } = request.body;
  const offset = currentPage == 1 ? 0 : (currentPage - 1) * limit;
  let where = {}
  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { address: { [Op.like]: `%${search}%` } },
    ]
  }

  let list = await userObj.findAll({
    where,

    /** attributes */
    // attributes : ['id','name',['email','emailId'],'role_id'],
    // attributes: { exclude: [], include: [] },
    // attributes: {
    //     exclude: [], include: [
    //         [sequelize.fn('CONCAT', sequelize.col('name'), ' Mr'), 'fullname']
    //     ]
    // },

    include: [
      { model: db.posts, as: 'posts' },
    ], order: [['createdAt', 'DESC']],
  });

  let listNew = await userObj.findAll({
    attributes: ['id', 'name', [sequelize.fn('COUNT', sequelize.col('Posts.publisher')), 'totalPosts']],
    include: [{ model: db.posts, attributes: [] }],
    group: ['id'],
  });

  if (!list) return response.status(500).send({ message: "Some error occurred while retrieving data." });

  return response.send({ list, listNew });
};


