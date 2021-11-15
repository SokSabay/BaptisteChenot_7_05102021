module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "posts",
    {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      imageUrl: {
        type: DataTypes.STRING,
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
      // timestamps: false,
    }
  );
  return Post;
};

// Export model Product
// module.exports = Post;
