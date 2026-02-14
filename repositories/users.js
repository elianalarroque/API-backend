const bcrypt = require("bcrypt");
const { users, teachers } = require("../models");

//function aux para saber si existe o no user
async function userFinder(id) {
  const user = await users.findByPk(id);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }
  return user;
}

module.exports = {
  getAll() {
    return users.findAll({
      //no muestro password por el defaultScope,
    });
  },
  getByEmail(email) {
    return users.findOne({
      where: { email },
    });
  },
  async getById(id) {
    return userFinder(id);
    //no muestro password por el defaultScope,
  },
  /* asincrona para encriptar la contraseña y q no llegue a la base de datos*/
  async insert(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await users.create({
      ...data,
      password: hashedPassword,
    });
    return newUser.reload();
  },

  async update(id, data) {
    const user = await userFinder(id);

    //si quiere cambiar la contraseña, se encripta
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    await user.update(data);
    return user.reload(); //recargo para q no muestre el psw
  },

  async delete(id) {
    //constatar q existe el id q quiero borrar
    const user = await userFinder(id);
    const teacher = await teachers.findOne({
      where: { user_id: id },
    });
    //restriccion para borrar
    if (teacher) {
      const error = new Error(
        "Cannot delete: this user is linked to a teacher",
      );
      error.status = 409;
      throw error;
    }
    return user.destroy();
  },

  async getActiveStatus(id) {
    const user = await userFinder(id);
    return {active: user.active};
  },

  async activateUser(id) {
    const user =await userFinder(id);
    await user.update({active: true});
    return user.reload();
  }
};



