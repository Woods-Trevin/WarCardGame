'use strict';
module.exports = (sequelize, DataTypes) => {
  const Victory = sequelize.define('Victory', {
    player: DataTypes.STRING
  }, {});
  Victory.associate = function (models) {
    // associations can be defined here
  };
  return Victory;
};