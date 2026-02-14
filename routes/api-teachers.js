const express = require("express");
const teachers = require("../repositories/teachers");
const teachers_router = express.Router();

teachers_router.get("/", async (req, res, next) => {
  // GET /api/teachers > lista todos los teachers
  try {
    const result = await teachers.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

teachers_router.get("/:id", async (req, res, next) => {
  // GET /api/teachers/:id > teacher por id
  try {
    const result = await teachers.getById(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

teachers_router.post("/", async (req, res, next) => {
  // POST /api/teachers > crear teacher
  try {
    const newTeacher = await teachers.create(req.body);
    res.status(201).json(newTeacher);
  } catch (error) {
    next(error);
  }
});

teachers_router.put("/:id", async (req, res, next) => {
  try {
    // PUT /api/teachers/:id > actualizar datos
    const updatedTeacher = await teachers.update(
      req.params.id,
      req.body,
    );
    res.json({ message: "Teacher updated succesfully", data: updatedTeacher });
  } catch (error) {
    next(error);
  }
});

teachers_router.delete("/:id", async (req, res, next) => {
  try {
    // DELETE /api/teachers/:id > no borrar si tiene estudiantes (restricción)
    await teachers.delete(req.params.id);
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    next(error);
  }
});

//endpoint especial
teachers_router.get("/:teacher_id/students", async (req, res, next) => {
  try {
    const result = await teachers.getStudentsByTeacherId(req.params.teacher_id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = teachers_router;
