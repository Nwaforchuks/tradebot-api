const express = require('express')
const router = express.Router();
const getUserAccount = require('../../controller/getUserAccountController');

router.route('/')
.get(getUserAccount.handleUseraccount)
.put(getUserAccount.handleUserAccountUpdate)

router.route('/:id').get(getUserAccount.handleUseraccount)

module.exports = router;
