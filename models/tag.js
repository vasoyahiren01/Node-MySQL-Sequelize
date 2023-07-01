module.exports = (database, Sequelize) => {
  return database.define("tags", {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    }
  });
};
