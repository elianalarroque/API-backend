const express = require("express");
const logout_router = express.Router();

logout_router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid"); //limpio la cookie en el navegador
    res.redirect("/login");
  });
});

module.exports = logout_router;
