const express = require('express');
const router = express.Router();
const comfarmController = require('../../controller/pingController')

router.get('/',comfarmController);

module.exports = router;