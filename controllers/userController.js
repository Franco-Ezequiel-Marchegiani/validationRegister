const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const user = require("../models/user");

const userController = {
  register: (req, res) => {
    return res.render("register");
  },
  processRegister: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("register", {
        errors: resultValidation.mapped(), //Mapped transforma un array en objeto literal
        oldData: req.body,
      });
    }
    //Corrobora que no hayan 2 emails iguales
    let userInDB = user.findByField("email", req.body.email);

    if (userInDB) {
      return res.render("register", {
        errors: {
          email: {
            msg: "Este email ya se encuentra en uso, pruebe con otro",
          },
        },
        oldData: req.body,
      });
    }
    //Coloca la imagen al crear un nuevo usuario
    //También pisa la contraseña que recibe y la modifica por una encriptada, más segura
    let userToCreate = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
      imageProfile: req.file.filename,
    };

    let userCreated = user.create(userToCreate);

    //res.redirect("/");
    return res.redirect("/users/login");
  },
  login: (req, res) => {
    res.render("login");
  },

  loginProcess: (req, res) => {
    let userToLogIn = user.findByField("email", req.body.email);
    if (userToLogIn) {
      let correctPassword = bcryptjs.compareSync(
        req.body.password,
        userToLogIn.password
      );
      if (correctPassword) {
        delete userToLogIn.password; // Borra la contraseña para que no aparezca en la página
        req.session.userLogged = userToLogIn;

        if (req.body.rememberUser) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 2 });
        }

        return res.redirect("/users/profile");
      }
      return res.render("login", {
        errors: {
          email: {
            msg: "Los datos ingresados no son correctos",
          },
        },
      });
    }
    return res.render("login", {
      errors: {
        email: {
          msg: "No se pudo contregar el login, pruebe nuevamente",
        },
      },
    });
  },

  userProfile: (req, res) => {
    console.log(req.cookies.userEmail);
    res.render("userProfile", { userData: req.session.userLogged });
  },
  logout: (req, res) => {
    //Elimina la cookie para que se pueda desloguear el usuario
    res.clearCookie("userEmail");
    //Elimina todo lo que está en session
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = userController;
