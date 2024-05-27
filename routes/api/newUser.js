const express = require('express')
const router = express.Router();
const newUsers = require('../../controller/registerClient');

router.route('/')
.post(newUsers)

module.exports = router;
