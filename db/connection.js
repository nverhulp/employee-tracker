// REQUIRED PACKAGES
const mysql = require('mysql2');

// DATABASE CONNECTION
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeeTracker_db'
    },
    console.log('You are not connected to the Employee Tracker database.')
);

module.exports = db;