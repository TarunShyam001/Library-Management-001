const dotenv = require('dotenv');
// dotenv.config(); // when running the app via "npm start" 
dotenv.config({path : './Library-Management-API/.env'}); // when running with simple "run command"
// console.log(dotenv);

const path = require('path');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

const sequelize = require ('./util/database');

const cors = require("cors");
const Users = require ('./models/users');
const Books = require('./models/books');
const Students = require('./models/students');
const Fine = require('./models/fine');
const ForgetPassword = require('./models/forget');

const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const studentRoutes = require('./routes/students');
const forgetRoutes = require('./routes/forget');

app.use(express.json());
app.use(cors());

Users.hasMany(ForgetPassword);
ForgetPassword.belongsTo(Users);

Books.hasMany(Students);
Students.belongsTo(Books);

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags : 'a'});

app.use(morgan('combined', {stream : accessLogStream}));

app.use('/user', userRoutes);
app.use('/books', bookRoutes);
app.use('/manage-students', studentRoutes);
app.use('/password', forgetRoutes);

const port = process.env.PORT;

// {force : true}

sequelize
.sync()
.then(() => {
    console.log(`server is working on http://localhost:${port}`);
    app.listen(port);
}).catch((err) => {
    console.log(err)
});



