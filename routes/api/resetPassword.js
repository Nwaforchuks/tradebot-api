const express = require('express')
const router = express.Router();
const resetpassword = require('../../controller/resetPasswordController');

router.route('/')
.put(resetpassword)

module.exports = router;