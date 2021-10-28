
const db = require("../config/db");
const DataTypes = require("sequelize");

// Define schema
const User = db.define(
  "users",
  {
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      // allowNull defaults to true
    },
    isAdmin :{
      type: DataTypes.BOOLEAN,
      allowNull: true,
    }
  },
  {
    // Freeze Table Name
    // freezeTableName: true
    timestamps: false,
  }
  );
  
  // Export model Product
  module.exports = User;
  
  // module.exports = (sequelize, DataTypes) => {
  //   const User = sequelize.define(
  //     "User",
  //     {
  //       email: DataTypes.STRING,
  //       usename: DataTypes.STRING,
  //       password: DataTypes.STRING,
  //       isAdmin: DataTypes.BOOLEAN,
  //     },
  //     {
  //       classMethods: {
  //         associate: function (models) {
  //           //association can be defined here
  //           models.User.hasMany(models.Post);
  //         },
  //       },
  //     }
  //   );
  //   return User;
  // };