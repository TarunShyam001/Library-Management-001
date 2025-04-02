const { where } = require('sequelize');
const Users = require('../models/users');
const Books = require('../models/books');
const bcrypt = require('bcrypt');
const sequelize = require('../util/database');

exports.getBooks = async (req, res) => {
    try {
        const books = await Books.findAll();
        // console.log(books);
        return res.status(200).json(books); 
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
};


exports.postAddBooks = async (req, res) => {
    try {
        const existingBook = await Books.findOne({ where: { bookId: req.body.bookId } });
        console.log(existingBook);
        if (existingBook) {
            return res.status(401).json({ message: "This book already exists in the database" });
        }

        const {bookId, title, author, year, stack} = req.body;
        const book = await Books.create({bookId, title, author, year, stack, availability : true});
        return res.status(201).json({book, message : "Book added into the data Successfully !!!"})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
};