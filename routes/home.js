const express = require("express");
const home_router = express.Router();
const { teachers } = require("../models");

const isAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
};

home_router.get("/", isAuth, async (req, res, next) => {
  try {
    const { user } = req.session;

    if (user.type === "admin") {
      return res.redirect("/users");
    }
    const teacherData = await teachers.findOne({
      where: { user_id: user.id },
    });
    if (teacherData) {
      teacherData.formattedDate =
        teacherData.date_of_birth.toLocaleDateString(); //para q no me muestre la hora
    }

    res.render("home", {
      title: "Home",
      user: user,
      teacher: teacherData,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = home_router;
