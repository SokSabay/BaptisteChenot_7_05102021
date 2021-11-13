
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "posts",
    {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      // content: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   // allowNull defaults to true
      // },
      attachment: {
        type: DataTypes.STRING(120),
        allowNull: false,
        // allowNull defaults to true
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
      // timestamps: false,
    }
  );
  return Post;
};

// Export model Product
// module.exports = Post;
