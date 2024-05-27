const express = require('express')
const router = express.Router();
const getUsers = require('../../controller/deleteUserController');

router.route('/')
.delete(getUsers)

module.exports = router;

