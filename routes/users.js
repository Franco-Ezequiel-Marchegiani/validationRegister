const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const validations = require("../middlewares/validationRegisterMiddleware");
const uploadFile = require("../middlewares/multerMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/profile", authMiddleware, userController.userProfile);

/* Get & Post user register */
router.get("/register", guestMiddleware, userController.register);
router.post(
  "/register",
  uploadFile.single("imageProfile"),
  validations,
  userController.processRegister
);

//Login Get
router.get("/login", guestMiddleware, userController.login);
//Login process
router.post("/login", userController.loginProcess);

//LogOut
router.get("/logout", userController.logout);

module.exports = router;
