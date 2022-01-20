'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerDeckOne = sequelize.define('PlayerDeckOne', {
    association: DataTypes.STRING,
    number: DataTypes.STRING,
    suit: DataTypes.STRING,
    face: DataTypes.BOOLEAN
  }, {});
  PlayerDeckOne.associate = function (models) {
    // associations can be defined here
  };
  return PlayerDeckOne;
};