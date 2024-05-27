const express = require('express');
const router = express.Router();
const comfarmController = require('../../controller/comfarmController')

router.put('/',comfarmController);

module.exports = router;