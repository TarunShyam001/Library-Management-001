const { where } = require('sequelize');
const Students = require('../models/students');
const Books = require('../models/books');
const Fines = require('../models/fine');
const sequelize = require('../util/database');

exports.getStudents = async (req, res) => {
    try {
        const students = await Students.findAll();

        return res.status(200).json(students); 
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.getFineInfo = async (req, res) => {
    try {
        const fineInfo = await Fines.findAll();  // Get data from database

        let totalFine = fineInfo.reduce((sum, data) => sum + data.fine, 0); 

        return res.status(200).json({fineInfo, totalFine}); 
    } catch (err) {
        console.log("Error in getFineInfo:", err);  // Log the error in case of failure
        return res.status(500).json({ message: 'Server error' });
    }
}

exports.getBooksInfo = async (req, res) => {
    try{
        const userRegId = req.user.regId;
        const student = await Students.findAll({ where: { rollCode: userRegId } });
        console.log(student);

        return res.status(200).json(student);
    } catch (err) {
        console.log("Error in getBooksInfo:", err);
        return res.status(500).json({ message: 'Server error' });
    }
}

exports.getStudFineInfo = async (req, res) => {
    try{
        const userRegId = req.user.regId;
        const student = await Fines.findAll({ where: { rollCode: userRegId } });
        
        let totalFine = student.reduce((sum, data) => sum + data.fine, 0); 

        return res.status(200).json(totalFine); 
        
    } catch (err) {
        console.log("Error in getBooksInfo:", err);
        return res.status(500).json({ message: 'Server error' });
    }
}

exports.getInfo = async (req, res) => {
    try {
        let totalBooksData = await Books.count();
        let totalIssuedData = await Students.count();

        const fineInfo = await Fines.findAll();  

        let totalFine = fineInfo.reduce((sum, data) => sum + data.fine, 0); 

        return res.status(200).json({totalBooksData, totalIssuedData, totalFine})
    } catch (err) {
        console.log("Error in getFineInfo:", err);  // Log the error in case of failure
        return res.status(500).json({ message: 'Server error' });
    }
}

exports.postAddBookInfo = async (req, res) => {
    try {
        const bookInfo = await Books.findOne({ 
            where: { bookId: req.body.bookCode } 
        });
        
        if (!bookInfo) {
            return res.status(401).json({ message: "This book information does not exist in the library-database : update the system" });
        } 

        const existingIssue = await Students.findOne({
            where: { bookCode: req.body.bookCode }
        });
        
        if (existingIssue) {
            return res.status(404).json({message: 'This book is already issued.' });
        }

        const {rollCode, name, bookCode, bookTitle} = req.body;

        const dataInfo = await Students.create({rollCode, name, bookCode, bookTitle, bookId : bookInfo.id});
        
        await bookInfo.update({availability : false});

        return res.status(201).json({dataInfo, message : "Book added into the data Successfully !!!"});

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
};


exports.postreturnBookInfo = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        const studentInfo = await Students.findOne({ where: { id: studentId } });

        const returnBook = await Books.findOne({where: {id : studentInfo.bookId}});

        await returnBook.update({availability : true});
        
        const fineInfo = await Fines.create({rollCode: studentInfo.rollCode, name: studentInfo.name, fine: studentInfo.fine});
        await studentInfo.destroy();

        return res.status(201).json({fineInfo, message: "Book returned to the library successfully!" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
