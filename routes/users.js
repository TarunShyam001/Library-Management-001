const path = require('path');

const express = require('express');

const adminController = require('../controllers/users');

const router = express.Router();

router.post('/signup', adminController.postAddUsers);

router.post('/login', adminController.postAddLogin);

module.exports = router;