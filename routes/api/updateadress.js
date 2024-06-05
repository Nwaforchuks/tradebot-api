const express = require('express')
const router = express.Router();
const getUserProfile = require('../../controller/Updateaddresscontroller');

router.route('/')
.put(getUserProfile)


module.exports = router;