"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class teachers extends Model {
    static associate(models) {
      // relacion 1:1 con user
      this.belongsTo(models.users, {
        foreignKey: "user_id"
      });
      //relacion 1:n con students
      this.hasMany(models.students, {
        foreignKey: "teacher_id"
      })
    }
  }
  teachers.init(
    {
      dni: DataTypes.STRING,
      name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "teachers",
    },
  );
  return teachers;
};
