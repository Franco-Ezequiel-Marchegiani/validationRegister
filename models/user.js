//1- Guardar al usuario en la DB
//2- Buscar al usuario que se quiere loguear por su email
//3- Busquear a su usuario por su ID
//4- Editar la información de un usuario
//5- Eliminar a un usuario de la DB

//CRUD (CREATE, READ, UPDATE & DELETE)
const fs = require("fs");

const user = {
  fileName: "./data/users.json",

  //No se puede utilizar arrow function ya que no se puede hacer un "this"
  getData: function () {
    return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
  },

  generateId: function name(params) {
    let allUsers = this.findAll();
    let lastUser = allUsers.pop();
    if (lastUser) {
      return lastUser.id + 1;
    }
    return 1;
  },

  findAll: function () {
    return this.getData();
  },
  findByPk: function (id) {
    let allUsers = this.findAll();
    let userFound = allUsers.find((oneUser) => {
      return oneUser.id === id;
    });
    return userFound;
  },
  findByField: function (field, text) {
    /* El field representa una columna, ya sea mail, nombre, usuario, etc.
    Y el "text" el contenido de ese campo 
    Esto no sirve con "country" ya que retorna el primero que encuentra*/
    let allUsers = this.findAll();
    let userFound = allUsers.find((oneUser) => {
      return oneUser[field] === text;
    });
    return userFound;
  },
  create: function (userData) {
    //El user data es un objeto literal con los datos del usuario
    let allUsers = this.findAll();
    let newUser = {
      id: this.generateId(),
      ...userData,
    };

    allUsers.push(newUser);
    fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "));
    return newUser;
  },

  destroy: function (id) {
    let allUsers = this.findAll();
    let finalUsers = allUsers.filter((oneUser) => oneUser.id !== id);
    fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "));
    return true;
  },
};

module.exports = user;
