const jwt = require("jsonwebtoken");
const express = require("express");
const router_jwt = express.Router();
const bcrypt = require("bcrypt");
const { users, teachers } = require("../models");

const SECRET_KEY = "super_secret_key_for_jwt";

//POST para el jwtoken

router_jwt.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //busco en el scope q muestra el psw
    const user = await users.scope("withPassword").findOne({
      where: { email: username },
    });

    // comparo con bcrypt
    const validPassword = await bcrypt.compare(password, user.password);

    // si no es valido el user o el psw lanzo error
    if (!user || !validPassword) {
      const err = new Error("Invalid username or password");
      err.status = 401;
      throw Error;
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      type: user.type,
      active: user.active,
    };

    const token = jwt.sign(tokenPayload, SECRET_KEY, {
      expiresIn: "15m",
    });

    console.log("Token generado con:", tokenPayload);

    /* bosco datos de teacher si es teacher*/
    let teacherData = null;
    if (user.type === "user") {
      teacherData = await teachers.findOne({
        where: { user_id: user.id },
      });
    }

    // respondo con el token json (agrego mas datos)
    res.json({
      token,
      user: {
        ...tokenPayload,
        teacher: teacherData,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router_jwt;
