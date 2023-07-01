const { DataTypes } = require('sequelize');

module.exports = (database, Sequelize) => {
  return database.define("comments", {
    comment: {
      type: Sequelize.STRING,
      allowNull: false
    },
    commentId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    commentType: {
      type: DataTypes.ENUM('News', 'Post'),
      defaultValue: "Post"
    },
    commentBy: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    paranoid: true
  });
};
