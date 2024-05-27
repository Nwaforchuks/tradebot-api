const express = require('express')
const router = express.Router();
const gain = require('../../controller/gainController');

router.route('/')
.get(gain)

module.exports = router;