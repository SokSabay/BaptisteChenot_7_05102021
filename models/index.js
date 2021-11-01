const sequelize = require("../config/db");
const Sequelize = require('sequelize')


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./User.js")(sequelize, Sequelize);
db.posts = require("./Post.js")(sequelize, Sequelize);

// db.users.hasMany(db.posts, { as: "posts" });
// db.posts.belongsTo(db.users, {
//   foreignKey: "userId",
//   as: "post",
// });


db.users.hasMany(db.posts);
db.posts.belongsTo(db.users);

// db.posts.hasMany(db.comments);
// db.comments.belongsTo(db.posts);

// db.users.hasMany(db.comments);
// db.comments.belongsTo(db.users);

db.sequelize.sync({ alter: true });

module.exports = db;
