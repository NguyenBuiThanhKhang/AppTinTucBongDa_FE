const express = require('express');
const {login, register} = require("../controllers/userController");
const router = express.Router();

router.post('/login', login);
router.post('/registers', register);

module.exports = router;