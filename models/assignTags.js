module.exports = (database, Sequelize) => {
  return database.define("assign_tags", {
    tagId: {
      type: Sequelize.INTEGER,
      unique: "tt_unique_constraint"
    },
    mediaId: {
      type: Sequelize.INTEGER,
      unique: "tt_unique_constraint"
    },
    mediaType: {
      type: Sequelize.STRING,
      unique: "tt_unique_constraint"
    }
  });
};
