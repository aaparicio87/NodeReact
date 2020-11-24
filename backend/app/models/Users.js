'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    title: DataTypes.ENUM('Dr', 'MR.', 'Mrs.', 'Miss', 'Ms.', 'Other'),
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "Name must containg only letters"
        },
        len: {
          args: [2, 255],
          msg: "The name must contain minimun 6 characters"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "Name must containg only letters"
        },
        len: {
          args: [2, 255],
          msg: "The last name must contain minimun 6 characters"
        }
      }
    },
    roomName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{isEmail: true}
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 255],
          msg: "The password must contain minimun 6 characters"
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    dateBirth: DataTypes.DATEONLY,
    gender: DataTypes.ENUM('Male', 'Female'),
    customer: DataTypes.BOOLEAN,
    admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};