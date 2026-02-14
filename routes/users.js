// ruta solo admin
const express = require("express");
const usersRoute = express.Router();
const users = require("../repositories/users");

const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.type === "admin") {
    return next();
  }
  const err = new Error("Admin access required");
  err.status = 401;
  next(err);
};

usersRoute.get("/", isAdmin, async (req, res, next) => {
  try {
    const list = await users.getAll();

    res.render("users", {
      title: "User list",
      user: req.session.user,
      userList: list,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRoute;
