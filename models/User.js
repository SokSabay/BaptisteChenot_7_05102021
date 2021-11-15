// const db = require("../config/db");
// const DataTypes = require("sequelize");

// Define schema
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      email: {
        unique: true,
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      username: {
        unique: true,
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
          len: [6, 12],
        },
        // allowNull defaults to true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,

        // allowNull defaults to true
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
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
  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };
  return User;
};

// Export model Product
// module.exports = User;

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
