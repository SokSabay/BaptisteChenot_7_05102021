module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "messages",
    {
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
    },
    {
      // Freeze Table Name
      // freezeTableName: true
    }
  );
  return Message;
};
