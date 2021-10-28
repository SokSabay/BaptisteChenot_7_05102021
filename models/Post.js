const db = require("../config/db");
const DataTypes = require("sequelize");
 
// Define schema
const Post = db.define(
  "posts",
  {
    // Define attributes
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
    idUser:{

    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    attachment: {
      type: DataTypes.STRING(120),
      allowNull: false,
      // allowNull defaults to true
    },
  },
  {
    // Freeze Table Name
    // freezeTableName: true
    timestamps: false,
  }
);
 
// Export model Product
module.exports = Post;