const express = require("express");
const bcrypt = require("bcrypt");
const { users } = require("../models");
const login_router = express.Router();

// GET login
login_router.get("/", (req, res, next) => {
  try {
    res.render("login", { title: "Login" });
  } catch (error) {
    next(error);
  }
});
// POST para login
login_router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body; //datos del formulario

    if (!username || !password) {
      //que pongan todos los datos o sino error
      const err = new Error("Missing credentials");
      err.status = 400;
      throw err;
    }

    const user = await users.scope("withPassword").findOne({
      where: { email: username },
    });

    // comparo el password y lo guardo en una constante
    const validPassword = await bcrypt.compare(password, user.password);

    // Ver si el usuario existe o si la contra es incorrecta
    if (!user || !validPassword) {
      return res.status(401).render("error-login");
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      type: user.type,
      active: user.active,
    };

    req.session.save((err) => {
      if (err) return next(err);
      res.redirect("/home");
    });
  } catch (error) {
    next(error);
  }
});

module.exports = login_router;
