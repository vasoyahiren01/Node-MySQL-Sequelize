module.exports = (database, Sequelize) => {
  return database.define("users", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING(255), allowNull: false, unique: true, validate: { isEmail: true }, len: [8, 255]
    },
    address: {
      type: Sequelize.TEXT
    },
    isDeleted: {
      type: Sequelize.BOOLEAN, defaultValue: false
    },
    deletedBy: {
      type: Sequelize.INTEGER
    },
    age: {
      type: Sequelize.INTEGER
    },
    gender: {
      type: Sequelize.STRING, values: ['Male', 'Female'], allowNull: false
    },
    lastLoginDate: {
      type: Sequelize.DATE
    },
  });
};
