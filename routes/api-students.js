const express = require("express");
const students = require("../repositories/students");
const students_router = express.Router();

students_router.get("/", async (req, res, next) => {
  // GET /api/students > lista todos los estudiantes
  try {
    const result = await students.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

students_router.get("/:id", async (req, res, next) => {
  // GET /api/students/:id > student por id
  try {
    const result = await students.getById(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

students_router.post("/", async (req, res, next) => {
  // POST /api/students > crear student
  try {
    const newStudent = await students.create(req.body);
    res.json(newStudent);
  } catch (error) {
    next(error);
  }
});

students_router.put("/:id", async (req, res, next) => {
  // PUT /api/students/:id > actualizar datos
  try {
    const updatedStudent = await students.update(
      req.params.id,
      req.params.body,
    );
    res.json({ message: "Student updated succesfully!", data: updatedStudent });
  } catch (error) {
    next(error);
  }
});
students_router.delete("/:id", async (req, res, next) => {
  // DELETE /api/students/:id
  try {
    await students.delete(req.params.id);
    res.json({ message: "Student deleted succesfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = students_router;