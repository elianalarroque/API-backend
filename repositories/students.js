const { students, teachers } = require("../models");

//funcion aux para lanzar error si no existe el student
async function studentFinder(id) {
  const student = await students.findByPk(id);

  if (!student) {
    const err = new Error("Student not found");
    err.status = 404;
    throw err;
  }

  return student;
}
module.exports = {
  getAll() {
    return students.findAll({
      include: [{ model: teachers, attributes: ["name", "last_name"] }],
    });
  },
  async getById(id) {
    return studentFinder(id);
  },

  create(data) {
    return students.create(data);
  },

  async update(id, data) {
    const student = await studentFinder(id);
    return student.update(data);

  },

  async delete(id) {
    const student = await studentFinder(id)
    return student.destroy();
  },
};
