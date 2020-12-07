'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Chats.init({
    message:{
      type: DataTypes.STRING,
      allowNull: false
    },
    type: DataTypes.ENUM('Text', 'File', 'Image', 'Video'),
  }, {
    sequelize,
    modelName: 'Chats',
  });
  return Chats;
};