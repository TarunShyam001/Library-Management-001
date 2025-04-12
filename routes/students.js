const path = require('path');

const express = require('express');

const studentController = require('../controllers/students');

const userAuthenticate = require('../middleware/auth')

const router = express.Router();

router.get('/get-data', studentController.getStudents);

router.get('/get-fine-data',studentController.getFineInfo);

router.get('/get-books-data', userAuthenticate.authorization, studentController.getBooksInfo);

router.get('/get-student-fine-data', userAuthenticate.authorization, studentController.getStudFineInfo);

router.get('/dashboard', studentController.getInfo);

router.post('/add-data', studentController.postAddBookInfo);

router.post('/delete-data/:studentId', studentController.postreturnBookInfo);

module.exports = router;
