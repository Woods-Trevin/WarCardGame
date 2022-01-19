'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerDeckTwo = sequelize.define('PlayerDeckTwo', {
    number: DataTypes.STRING,
    suit: DataTypes.STRING,
    face: DataTypes.BOOLEAN
  }, {});
  PlayerDeckTwo.associate = function(models) {
    // associations can be defined here
  };
  return PlayerDeckTwo;
};