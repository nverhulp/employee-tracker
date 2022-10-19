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