const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '',
  database: 'employeetracker_db',
});

connection.connect((err) => {
    if (err) throw err;
    start();
  });
  
  const start = () => {
    // initial questions for user
        inquirer
            .prompt({
                name: 'startprompt',
                type: 'list',
                message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Roles',
                'View Departments',
                'Exit'
            ],      
        })
        .then((answer) => {
            switch (answer.startprompt) {
                case 'View Departments':
                    departments();
                    break;
                
                case 'View Roles':
                    roles();
                    break;
    
                case 'View Employees':
                    employees();
                    break;
    
                case 'Exit':
                    console.log('Exiting...');
                    connection.end();
                    break;
            }
        });
     }
    
    
    const departments = () => {
    //questions regarding departments
        inquirer
            .prompt({
                name: 'departments',
                type: 'list',
                message: 'departments?',
                choices: [
                    'View all',
                    'Add'
                ]
            })
            .then((answer) => {
                switch(answer.departments) {
                    case 'View all':
                        // SQL query
                        connection.query(
                            'SELECT * FROM department',
                            (err, res) => {
                               
                                if (res) {
                                    console.log('\n List of Departments: \n');
                                    res.forEach((response) => {console.log(response.name)});
                                    console.log('');
                                    start();
                                } else {
                                    console.log(`Error ${err}`)
                                }
                            })
                        break;
    
                    case 'Add':
                        //prompt for new department name 
                        inquirer
                            .prompt({
                                name: 'newDept',
                                type: 'input',
                                message: 'new department name: '
                            })
                            .then((response) => {
    
                                //database connection to add the new department 
                                connection.query(`INSERT INTO departments (name) VALUES ('${response.newDept}')`);
                                console.log(`new department: ${response.newDept}`);
    
                                start();
                            })
    
                        break;
                }
            })
    }
    
    
    const roles = () => {
    //questions regarding departments
        inquirer
            .prompt({
                name: 'roles',
                type: 'list',
                message: 'roles?',
                choices: [
                    'View all',
                    'Add'
                ]
            })
            .then((answer) => {
                switch(answer.roles) {
                    case 'View all':
                        connection.query(
                            'SELECT *FROM role',
                            (err, res) => {
                                if (res) {
                                    console.log('\n List of Roles: \n');
                                    res.forEach(({title, salary, department_id }) => {
                                        console.log(`| ${title} | ${salary} | ${department_id}`);
                                    });
                                    
                                    start();
                                } else {
                                    console.log(`Error ${err}`);
                                }
                            })
                        break;
    
                    case 'Add': 
                        //prompt for new role name 
                        inquirer
                            .prompt([
                                {
                                    name: 'newRole',
                                    type: 'input',
                                    message: 'new role name: ',
                                },
                                {
                                    name: 'newRoleSalary',
                                    type: 'input',
                                    message: 'salary for new role: ',
                                }
                                ])
                            .then((response) => {
                                //creates random department_id between 1-4
                                const dept_id = Math.floor(Math.random() * 4) + 1    
    
                                //database connection to add new role 
                                connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${response.newRoleName}', ${response.newRoleSalary}, ${dept_id})`);
                            
                                console.log(`\n Inserting new role of: ${response.newRoleName} \n`);
    
                                start();
                            })
                        break;
                }
            })
    }
    
    
