const express = require("express");
const {translateHTML} = require("../ApiGermini/apiGer");
const {createMNDB} = require("../controllers/mNewspaperController");
const router = express.Router();

router.post("/translate", translateHTML);
router.post("/createDB", createMNDB)

module.exports = router;
