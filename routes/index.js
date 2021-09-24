const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
/* GET home page. */
router.get("/", mainController.index);
router.get("/aprobationMessage", mainController.aprobationMsg);

module.exports = router;
