const path = require('path');

const express = require('express');

const bookController = require('../controllers/books');

const router = express.Router();

router.get('/get-books', bookController.getBooks)

router.post('/add-books', bookController.postAddBooks);

module.exports = router;
