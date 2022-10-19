// REQUIRED PACKAGES
const db = require("./db/connection");
const inquirer = require("inquirer");
require("console.table");

// ARRAY
const employees = [];

// START/MAIN MENU
const mainMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "userChoice",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
        },
    ])
    .then((answers) => {
        console.log(answers);
        if(answers.userChoice === "View all departments") {
            viewDepartments();
        }
        if(answers.userChoice === "View all roles") {
            viewRoles();
        }
        if(answers.userChoice === "View all employees") {
            viewEmployees();
        }
        if(answers.userChoice === "Add a department") {
            addDepartment();
        }
        if(answers.userChoice === "Add a role") {
            addRole();
        }
        if(answers.userChoice === "Add an employee") {
            addEmployee();
        }
        if(answers.userChoice === "Update an employee role") {
            updateEmployeeRole();
        }
    });
};

// VIEW DEPARTMENTS
const viewDepartments = () => {
    db.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        console.log(results);
        mainMenu();
    });
};

// VIEW ROLES
const viewRoles = () => {
    db.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        console.log(results);
        mainMenu;
    });
};

// VIEW EMPLOYEES
const viewEmployees = () => {
    db.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        console.log(results);
        mainMenu;
    });
};

// ADD DEPARTMENT
const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the department?',
            validate: (name) => {
                if (name) {
                    return true;
                } else {
                    console.log("You must enter the department name");
                    return false;
                }
            },
        },
    ])
    .then((answers) => {
        const sql = 'INSERT INTO department (name) VALUES (?)';
        const params = [answers.name];
        db.query(sql, params, function (err, results) {
            if (err) throw err;
            console.log(results);
            mainMenu();
        });
    });
};