const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");


/* ------------------------------database connection start----------------------------- */
const database = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  // logging: false, */ query print off */
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.databaseConf = database;
// function to drop existing tables and re-sync database
db.dropRestApiTable = () => {
  db.databaseConf.sync({ force: true }).then(() => {
    console.log("restTutorial table just dropped and db re-synced.");
  });
};
/* ------------------------------database connection end----------------------------- */



/* ------------------------------model define start----------------------------- */

db.users = require("./users")(database, Sequelize);
db.posts = require("./post")(database, Sequelize);
db.news = require("./news")(database, Sequelize);
db.comments = require("./comments")(database, Sequelize);
db.tags = require("./tag")(database, Sequelize);
db.assignTags = require("./assignTags")(database, Sequelize);

/* ------------------------------model define end----------------------------- */


db.users.hasMany(db.posts, { foreignKey: 'publisher' }); /* user id match with all post publisher */
db.posts.belongsTo(db.users, { foreignKey: 'publisher' }); /* publisher match in user table id */

db.users.hasMany(db.news, { foreignKey: 'publisher' }); /* user id match with all News publisher */
db.news.belongsTo(db.users, { foreignKey: 'publisher' }); /* publisher match in user table id */


db.posts.hasMany(db.comments, {
  foreignKey: "commentId",
  constrains: false,
  scope: {
    commentype: "Post"
  }
})

db.news.hasMany(db.comments, {
  foreignKey: "commentId",
  constrains: false,
  scope: {
    commentype: "News"
  }
})

db.comments.belongsTo(db.posts, { foreignKey: "commentId", constrains: false });
db.comments.belongsTo(db.news, { foreignKey: "commentId", constrains: false });


// Many To Many
db.posts.belongsToMany(db.tags, {
  through: {
    model: db.assignTags,
    unique: false,
    scope: {
      mediaType: "Post"
    }
  },
  foreignKey: "mediaId",
  constrains: false
})

db.news.belongsToMany(db.tags, {
  through: {
    model: db.assignTags,
    unique: false,
    scope: {
      mediaType: "News"
    }
  },
  foreignKey: "mediaId",
  constrains: false
})

db.tags.belongsToMany(db.posts, {
  through: {
    model: db.assignTags,
    unique: false,
    scope: {
      mediaType: "Post"
    }
  },
  foreignKey: "tagId",
  constrains: false
})

db.tags.belongsToMany(db.news, {
  through: {
    model: db.assignTags,
    unique: false,
    scope: {
      mediaType: "News"
    }
  },
  foreignKey: "tagId",
  constrains: false
})

module.exports = db;
