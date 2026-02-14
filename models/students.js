"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    static associate(models) {
      // relacion n:1 con teachers
      this.belongsTo(models.teachers, {
        foreignKey: "teacher_id"
      });
    }
  }
  students.init(
    {
      dni: DataTypes.STRING,
      name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "students",
    },
  );
  return students;
};
