const express = require("express");
const session = require("express-session");
const cors = require("cors");

const users_router = require("./routes/api-users");
const teachers_router = require("./routes/api-teachers");
const students_router = require("./routes/api-students");

const token_router = require("./routes/api-token");

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/api/users", users_router);
app.use("/api/teachers", teachers_router);
app.use("/api/students", students_router);
app.use("/api/token", token_router);

app.get("/", (req, res) => res.redirect("/login"));

app.use((err, req, res, next) => {
  console.log(err);
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

// Creo el servidor en el puerto ${port}
app.listen(port, () => {
  // Se escribe la URL para el acceso al servidor
  console.log(`Example server listening on http://localhost:${port}`);
});
