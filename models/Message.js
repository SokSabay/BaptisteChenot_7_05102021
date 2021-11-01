const db = require("../config/db");
const DataTypes = require("sequelize");

// Define schema
const Message = db.define(
  "messages",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },

    comment: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    AuthorId: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
    ArticleId: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    // Freeze Table Name
    // freezeTableName: true
  }
);
Message.associate = (models) => {
  Message.belongsTo(models.Post);
  Message.belongsTo(models.User);
};
// Export model Product
module.exports = Message;
