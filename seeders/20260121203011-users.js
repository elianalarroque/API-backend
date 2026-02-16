"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;
    const adminPasswordHash = await bcrypt.hash("admin123", saltRounds);
    const userOnePasswordHash = await bcrypt.hash("user123", saltRounds);
    const userTwoPasswordHash = await bcrypt.hash("user234", saltRounds);
    const userThreePasswordHash = await bcrypt.hash("user345", saltRounds);
    const userFourPasswordHash = await bcrypt.hash("user456", saltRounds);
    const userFivePasswordHash = await bcrypt.hash("user567", saltRounds);
    const userSixPasswordHash = await bcrypt.hash("user678", saltRounds);
    const userSevenPasswordHash = await bcrypt.hash("user789", saltRounds);
    const userEightPasswordHash = await bcrypt.hash("user890", saltRounds);
    const userNinePasswordHash = await bcrypt.hash("user901", saltRounds);
    const userTenPasswordHash = await bcrypt.hash("user012", saltRounds);

    await queryInterface.bulkInsert("users", [
      {
        email: "admin@test.com",
        password: adminPasswordHash,
        type: "admin",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "first@user.com",
        password: userOnePasswordHash,
        type: "user",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "second@user.com",
        password: userTwoPasswordHash,
        type: "user",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "third@user.com",
        password: userThreePasswordHash,
        type: "user",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "fourth@user.com",
        password: userFourPasswordHash,
        type: "user",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "fifth@user.com",
        password: userFivePasswordHash,
        type: "user",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "sixth@user.com",
        password: userSixPasswordHash,
        type: "user",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "seventh@user.com",
        password: userSevenPasswordHash,
        type: "user",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "eighth@user.com",
        password: userEightPasswordHash,
        type: "user",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "ninth@user.com",
        password: userNinePasswordHash,
        type: "user",
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "tenth@user.com",
        password: userTenPasswordHash,
        type: "user",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
 
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
