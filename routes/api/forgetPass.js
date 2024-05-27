const express = require('express');
const router = express.Router();
const forgetPassController = require('../../controller/forgetPassController')

router.post('/',forgetPassController);

module.exports = router;