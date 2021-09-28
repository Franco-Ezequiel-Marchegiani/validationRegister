const { body } = require("express-validator");
const path = require("path");

const validations = [
  body("fullName").notEmpty().withMessage("El nombre es un campo obligatorio"),
  body("userName")
    .notEmpty()
    .withMessage("El nombre de usuario es un campo obligatorio"),
  body("email")
    .notEmpty()
    .withMessage("Es obligatorio colocar un email")
    .bail()
    .isEmail()
    .withMessage("Debe colocar un mail válido"),
  body("password")
    .notEmpty()
    .withMessage("Es necesario colocar una contraseña")
    .bail()
    .isLength({ min: 6, max: 30 })
    .withMessage("La contraseña debe tener entre 6 y 30 caracteres"),
  body("country").notEmpty().withMessage("Debe seleccionar un país"),
  body("imageProfile").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif"];

    if (file == undefined) {
      throw new Error("Tienes que adjuntar una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivos permitidas son${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }

    return true;
  }),
];

module.exports = validations;
