"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("teachers", [
      {
        dni: "34567890C",
        name: "Farrokh",
        last_name: "Bulsara",
        date_of_birth: new Date("1946-09-05"),
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "12345678B",
        name: "Niall",
        last_name: "Horan",
        date_of_birth: "1993-09-13",
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "87654321A",
        name: "Michael",
        last_name: "Jackson",
        date_of_birth: "1958-08-29",
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "23456789B",
        name: "Steven",
        last_name: "Tallarico",
        date_of_birth: new Date("1948-03-26"),
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "12345678A",
        name: "Nicholas",
        last_name: "Jonas",
        date_of_birth: new Date("1992-09-16"),
        user_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "45678901D",
        name: "Joseph",
        last_name: "Jonas",
        date_of_birth: new Date("1989-08-15"),
        user_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "56789012E",
        name: "Billie",
        last_name: "Armstrong",
        date_of_birth: new Date("1972-02-17"),
        user_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "67890123F",
        name: "Mauro",
        last_name: "Lombardo",
        date_of_birth: new Date("1996-06-24"),
        user_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "78901234G",
        name: "Valentín",
        last_name: "Oliva",
        date_of_birth: new Date("1998-01-23"),
        user_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "89012345H",
        name: "Tiago",
        last_name: "Pacheco Lezcano",
        date_of_birth: new Date("2001-08-03"),
        user_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "90123456J",
        name: "Martijn",
        last_name: "Garritsen",
        date_of_birth: new Date("1996-05-14"),
        user_id: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
