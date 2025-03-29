const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Students = sequelize.define('students', {
  id : {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true
  },
  rollCode : {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bookCode: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  bookTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  currentTime: {
    type: Sequelize.VIRTUAL,  // Specifies that this is a virtual field
    get() {
        const createdAt = this.getDataValue('createdAt');  // Get the 'createdAt' field value from the instance
        if (createdAt) {
          const currentTime = new Date(createdAt);  // Convert 'createdAt' to a Date object
    
          // Format the return time as a human-readable string (e.g., 'Mar 18 2025 12:50 PM')
          const createdTime = currentTime.toLocaleString('en-IN', {
            weekday: 'short',  // abbreviated day of the week (e.g., "Tue")
            year: 'numeric',   // full year (e.g., "2025")
            month: 'short',    // abbreviated month (e.g., "Mar")
            day: 'numeric',    // day of the month (e.g., "18")
          });
    
          return createdTime;  // Return the formatted date string
        }
        return null;  // If 'createdAt' is null, return null
      }
    },
    returnTime: {
      type: Sequelize.VIRTUAL,  // Specifies that this is a virtual field
      get() {
        const createdAt = this.getDataValue('createdAt');  // Get the 'createdAt' field value from the instance
        if (createdAt) {
          const returnTime = new Date(createdAt);  // Convert 'createdAt' to a Date object
          returnTime.setDate(returnTime.getDate() + 5);  // Add 1 hour to the 'createdAt' time
    
          // Format the return time as a human-readable string (e.g., 'Mar 18 2025 12:50 PM')
          const formattedReturnTime = returnTime.toLocaleString('en-IN', {
            weekday: 'short',  // abbreviated day of the week (e.g., "Tue")
            year: 'numeric',   // full year (e.g., "2025")
            month: 'short',    // abbreviated month (e.g., "Mar")
            day: 'numeric',    // day of the month (e.g., "18")
          });
    
          return formattedReturnTime;  // Return the formatted date string
        }
        return null;  // If 'createdAt' is null, return null
      }
    }
  },{
    timestamps: true
});

module.exports = Students;
