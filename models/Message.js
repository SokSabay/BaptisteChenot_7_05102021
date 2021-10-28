const db = require("../config/db");
const DataTypes = require("sequelize");

// Define schema
const Message = db.define(
  "messages",
  {
    comment: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
  },
  {
    // Freeze Table Name
    // freezeTableName: true
    timestamps: false,
  }
);

// Export model Product
module.exports = Message;
