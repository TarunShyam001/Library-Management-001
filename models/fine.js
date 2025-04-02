const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Fines = sequelize.define('fine-details', {
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
  fine: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  returnedDate: {
    type: Sequelize.VIRTUAL,  
    get() {
        const createdAt = this.getDataValue('createdAt');  
        if (createdAt) {
            const dateOfReturn = new Date(createdAt);  
      
            const returnDate = dateOfReturn.toLocaleString('en-IN', {
                weekday: 'short', 
                year: 'numeric',  
                month: 'short',   
                day: 'numeric'
            });
            return returnDate; 
        }
        return null; 
    }
  }
},{
    timestamps: true
});

module.exports = Fines;
