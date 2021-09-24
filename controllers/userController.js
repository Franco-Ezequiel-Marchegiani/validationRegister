const { validationResult } = require("express-validator");

const userController = {
  register: (req, res) => {
    res.render("register");
  },
  processRegister: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("register", {
        errors: resultValidation.mapped(), //Mapped transforma un array en objeto literal
        oldData: req.body,
      });
    }
    //res.redirect("/");
    return res.redirect("/aprobationMessage");
  },
  login: (req, res) => {
    res.render("login");
  },
  userProfile: (req, res) => {
    res.render("userProfile");
  },
};

module.exports = userController;
