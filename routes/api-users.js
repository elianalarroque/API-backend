const express = require("express");
const { body, validationResult } = require("express-validator");
const users = require("../repositories/users");
const users_router = express.Router();

//constante para validar
const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error(errors.array()[0].msg);
    err.status = 400;
    return next(err);
  }
  next();
};

users_router.get("/", async (req, res, next) => {
  // GET /api/users > lista todos los usuarios
  try {
    const result = await users.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

users_router.get("/:id", async (req, res, next) => {
  // GET /api/users/:id > usuario por id
  try {
    const result = await users.getById(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

users_router.post(
  "/",
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (email) => {
      const existingEmail = await users.getByEmail(email);
      if (existingEmail) throw new Error("Email already in use");
    }),
  body("password").notEmpty().withMessage("Password is required"),
  validator, //paso la constante q tiene la funcion para validar
  async (req, res, next) => {
    // POST /api/users > crear usuario (encriptar contraseña con bcrypt)
    try {
      const newUser = await users.insert(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

users_router.put(
  "/:id",
  body("email").optional().isEmail().withMessage("Invalid email"),
  validator,
  async (req, res, next) => {
    // PUT /api/users/:id > actualizar datos
    try {
      const updatedUser = await users.update(req.params.id, req.body);
      res.json({ message: "User updated!", data: updatedUser });
    } catch (error) {
      next(error);
    }
  },
);

users_router.delete("/:id", async (req, res, next) => {
  // DELETE /api/users/:id > restriccion para borrar
  try {
    await users.delete(req.params.id);
    res.json({ message: "User deleted succesfully" });
  } catch (error) {
    next(error);
  }
});

//endpoints GET y POST de /api/users/:id/active

users_router.get("/:id/active", async (req, res, next) => {
  try {
    const result = await users.getActiveStatus(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

users_router.post("/:id/active", async (req, res, next) => {
  try {
    const updateStatus = await users.activateUser(req.params.id);
    res.json(updateStatus);
  } catch (error) {
    next(error);
  }
});

module.exports = users_router;
