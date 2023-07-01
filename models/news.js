module.exports = (database, Sequelize) => {
  return database.define("news", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    published: {
      type: Sequelize.BOOLEAN
    },
    publisher: {
      type: Sequelize.INTEGER
    }
  });
};
