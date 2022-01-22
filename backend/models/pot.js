'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pot = sequelize.define('Pot', {
    association: DataTypes.STRING,
    number: DataTypes.STRING,
    suit: DataTypes.STRING,
    face: DataTypes.STRING
  }, {});
  Pot.associate = function (models) {
    // associations can be defined here
  };
  return Pot;
};