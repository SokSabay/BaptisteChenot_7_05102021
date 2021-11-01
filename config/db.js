require("dotenv").config();

const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);
// const sequelize = new Sequelize("groupomania", "root", "ZeClown3011", {
//   host: "localhost",
//   dialect: "mysql",
// });




sequelize
  .sync({ altre: true })
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
const databaseConnectionTest = async () => {
  console.log("Connection avec la base de donnée..");

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

databaseConnectionTest();
// sequelize.query("show tables").then(function (rows) {
//   console.log((rows));
// });
// sequelize.query("SELECT * FROM `users`").then(function (rows) {
//   console.log(rows);
// });
