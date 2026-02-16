const { teachers, students, users } = require("../models");

//funcion aux para lanzar error si no existe teacher
async function teacherFinder(id) {
  const teacher = await teachers.findByPk(id, {
    include: [
      {
        model: users,
         as: "user",
        attributes: ["id", "email", "type", "active"],
      },
    ],
  });
  if (!teacher) {
    const err = new Error("Teacher not found");
    err.status = 404;
    throw err;
  }
  return teacher;
}

module.exports = {
  getAll() {
    return teachers.findAll({
      include: [{ model: users,  as: "user", attributes: ["email", "type", "active"] }],
    });
  },
  async getById(id) {
    return teacherFinder(id);
  },
  create(data) {
    return teachers.create(data);
  },

  async update(id, data) {
    const teacher = await teacherFinder(id);
    return teacher.update(data);
  },

  async delete(id) {
    const teacher = await teacherFinder(id);
    const studentsCount = await students.count({
      where: { teacher_id: id },
    });
    if (studentsCount > 0) {
      const err = new Error("Cannot be deleted: Teacher has students");
      err.status = 409;
      throw err;
    }
    return teacher.destroy();
  },
  async getStudentsByTeacherId(teacherId) {
    const teacher = await teacherFinder(teacherId);

    if (!teacher.user || teacher.user.active !== true) {
      const err = new Error("Unauthorized: teacher user not active");
      err.status = 401;
      throw err;
    }

    const studentList = await students.findAll({
      where: { teacher_id: teacherId },
      order: [["date_of_birth", "ASC"]],
    });

    if (studentList.length === 0) {
      const err = new Error("This teacher has no students assigned at the moment")
      err.status=404;
      throw err;
    }

    return studentList;
  },
};
