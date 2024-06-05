const express = require('express');
const router = express.Router();
const comfarmController = require('../../controller/fetchcrytoController')

router.get('/',comfarmController);

module.exports = router;