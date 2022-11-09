// REQUIRED PACKAGES
const mysql = require('mysql2');
const db = require("./db/connection");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// ARRAY
const employees = [];

// CONNECTION BETWEEN SERVER AND DATABASE
db.connect(function (err) {
    if (err) throw err;
});

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
            if (answers.userChoice === "View all departments") {
                viewDepartments();
            }
            if (answers.userChoice === "View all roles") {
                viewRoles();
            }
            if (answers.userChoice === "View all employees") {
                viewEmployees();
            }
            if (answers.userChoice === "Add a department") {
                addDepartment();
            }
            if (answers.userChoice === "Add a role") {
                addRole();
            }
            if (answers.userChoice === "Add an employee") {
                addEmployee();
            }
            if (answers.userChoice === "Update an employee role") {
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
        mainMenu();
    });
};

// VIEW EMPLOYEES
const viewEmployees = () => {
    db.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        console.log(results);
        mainMenu();
    });
};

// ADD DEPARTMENT
const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the department?',
            validate: (depNameInput) => {
                if (depNameInput) {
                    return true;
                } else {
                    console.log("You must enter the department name");
                    return false;
                }
            },
        },
    ])
        .then((answers) => {
            const sql = 'INSERT INTO department (dep_name) VALUES (?)';
            const params = [answers.name]
            db.query(sql, params, function (err, results) {
                if (err) throw err;
                console.log(results);
                mainMenu();
            });
        });
};

// ADD ROLE
const addRole = () => {
    inquirer.prompt([
        {
            // TITLE
            name: 'title',
            type: 'input',
            message: 'What is the name of the job title?',
            validate: (jobTitleInput) => {
                if (jobTitleInput) {
                    return true;
                } else {
                    console.log("You must enter the job title name");
                    return false;
                }
            },
        },
        {
            // SALARY
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the role?',
            validate: (salaryInput) => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log("You must enter the salary");
                    return false;
                }
            },
        },
        {
            // DEPARTMENT ID
            name: 'department_id',
            type: 'input',
            message: 'What is the department ID?',
            validate: (deptId) => {
                if (deptId) {
                    return true;
                } else {
                    console.log("You must enter the department ID");
                    return false;
                }
            },
        },
    ])
        .then((answers) => {
            console.log(answers);
            const sql = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
            const params = [answers.title, answers.salary, answers.department_id]
            db.query(sql, params, function (err, results) {
                if (err) throw err;
                console.log(results);
                mainMenu();
            });
        });
};

// ADD EMPLOYEE
const addEmployee = () => {
    inquirer.prompt([
        {
            // FIRST NAME
            name: 'first_name',
            type: 'input',
            message: 'What is the first name of the employee?',
            validate: (firstNameInput) => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log("You must enter a first name");
                    return false;
                }
            },
        },
        {
            // LAST NAME
            name: 'last_name',
            type: 'input',
            message: 'What is the last name of the employee?',
            validate: (lastNameInput) => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log("You must enter a last name");
                    return false;
                }
            },
        },
        {
            // ROLE ID
            name: 'role_id',
            type: 'input',
            message: 'What is the role ID of the employee?',
            validate: (employeeRoleIdInput) => {
                if (employeeRoleIdInput) {
                    return true;
                } else {
                    console.log("You must enter the role ID");
                    return false;
                }
            },
        },
        {
            // MANAGER ID
            name: 'manager_id',
            type: 'input',
            message: 'What is the manager ID of the employee?',
            validate: (managerNameIdInput) => {
                if (managerNameIdInput) {
                    return true;
                } else {
                    console.log("You must enter the manager ID");
                    return false;
                }
            },
        },
    ])
        .then((answers) => {
            console.log(answers);
            const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
            const params = [answers.first_name, answers.last_name, answers.role_id, answers.manager_id];
            db.query(sql, params, function (err, results) {
                if (err) throw err;
                console.log(results);
                mainMenu();
            });
        });
};

// UPDATE EMPLOYEE ROLE
const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            // CHOOSE EMPLOYEE
            name: 'employee_id',
            type: 'input',
            message: 'What is the ID of the employee you want to update?',
            validate: (updateEmployeeRole) => {
                if (updateEmployeeRole) {
                    return true;
                } else {
                    console.log("You must enter the employee ID");
                    return false;
                }
            },
        },
        {
            // UPDATE EMPLOYEE ROLE
            name: 'role_id',
            type: 'input',
            message: 'What is the new role ID?',
            validate: (updateRoleIdInput) => {
                if (updateRoleIdInput) {
                    return true;
                } else {
                    console.log("You must enter the role ID");
                    return false;
                }
            },
        },
    ])
    .then((answers) => {
        console.log(answers);
        const sql = "UPDATE employee SET role_id = ? WHERE id = ?";
        const params = [answers.role_id, answers.employee_id];
          db.query(sql, params, function (err, results) {
            if (err) throw err;
            console.log(results);
            mainMenu();
            });
        });
};

mainMenu();