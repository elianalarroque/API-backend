"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      // relacion 1:1 con teacher
      this.hasOne(models.teachers, {
        foreignKey: "user_id"
      });
    }
  }
  users.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "users",
      defaultScope: {
        attributes: {exclude: ["password"]},
      },
      scopes: {
        withPassword: {
          attributes:{ exclude: [] }
        }
      }
    },
  );
  return users;
};
