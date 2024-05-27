const express = require('express')
const router = express.Router();
const getUserProfile = require('../../controller/getUserProfileController');

router.route('/')
.get(getUserProfile.handleUserprofile)
.put(getUserProfile.handleUserprofileUpdate)


module.exports = router;
