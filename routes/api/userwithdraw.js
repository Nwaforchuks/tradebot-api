const express = require('express')
const router = express.Router();
const handleWithDraw = require('../../controller/WithDrawController');

router.route('/')
.put(handleWithDraw)

module.exports = router;