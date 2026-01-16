const express = require("express");
const {translateHTML} = require("../ApiGermini/apiGer");
const {createMNDB, getNews, getCountryCode} = require("../controllers/mNewspaperController");
const router = express.Router();

router.post("/translate", translateHTML);
router.post("/createDB", createMNDB);
router.post("/getNews",getNews)
router.post("/getCountry",getCountryCode)

module.exports = router;
