'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Conversations.hasMany(models.Messages, {
        foreignKey: 'conversation_id',
      });
    }
  };
  Conversations.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "Name must containg only letters"
        },
        len: {
          args: [2, 255],
          msg: "The name must contain minimun 2 characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Conversations',
  });
  return Conversations;
};