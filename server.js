const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Port
  port: 3306,

  // Your username
  user: 'root',

  // password and database
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
                    console.log('you have exited!');
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
                                connection.query(`INSERT INTO department (name) VALUES ('${response.newDept}')`);
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
                                connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${response.newRole}', ${response.newRoleSalary}, ${dept_id})`);
                            
                                console.log(`\n Inserting new role of: ${response.newRole} \n`);
    
                                start();
                            })
                        break;
    

                        
                }
            })
    }
    const employees = () => {
        inquirer
            .prompt({
                name: 'employeeResp',
                type: 'list',
                message: 'employees?',
                choices: [
                    'View all',
                    'Add',
                    'Update employee role',
                    'Delete employee'
                    
                ]
            })
            .then((answer) => {
                switch(answer.employeeResp) {
                    //views all employees 
                    case 'View all':
                        //write SQL query
                        connection.query(
                            'SELECT * FROM employee',
                            (err, res) => {

                                if (res) {
                                    console.log('\n List of Employee: \n');
                                    res.forEach((response) => {console.log(`${response.first_name} ${response.last_name}`)});
                                    console.log('');
                                    start();
                                } else {
                                    console.log(`Error! ... ${err}`);
                                }
                            }
                        )
                        break;
    
                    case 'Add':
                        //connect to db
                        connection.query(
                            'SELECT * FROM role', 
                            (err, res) => {
                                //create array of roles
                                let roles = [];
                                res.forEach((role) => {roles.push(role.title)});
                                
                                
                                inquirer
                                    .prompt([
                                        {
                                            name: 'name',
                                            type: 'input',
                                            message: 'Enter employee name, first and last '
                                        },
                                        {
                                            name: 'role',
                                            type: 'list',
                                            message: 'Choose employee role: ',
                                            choices: ['IT Specialist', 'Manager', 'Engineer'],
                                        },
                                    ])
                                    .then((response) => {
                                        //creates random employee id between 1-1000
                                        const id = Math.floor(Math.random() * 1000) + 1
                                        //creates random manager_id between 1-4
                                        const manager_id = Math.floor(Math.random() * 4) + 1    
    
                                        //break apart name into first and last name
                                        let name = response.name.split(" ");
                                        const firstName = name[0];
                                        const lastName = name[1];
                                        
                                        //set role_id depending on role
                                        let role_id;
                                        switch(response.role) {
                                            case 'IT Specialist': role_id = 1; break;
                                            case 'Engineer': role_id = 2; break;
                                            case 'Manager': role_id = 3; break;
                                    
                                        }
    
                                        console.log(`\n employee record: ${firstName}, ${lastName}, ${role_id}, ${manager_id} added \n`);
                                        
                                        //insert values into database 
                                        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${role_id}, ${manager_id})`);
                                        start();
                                    })});
                        break;
    
                    case 'Update employee role':
                        // Ask for employee name
                        inquirer
                            .prompt({
                                name: 'employeeName',
                                type: 'input',
                                message: 'employee you would like to update: first and last  '
                            })
                            .then((answer) => {
                                //split answer into first and last name 
                                let name = answer.employeeName.split(" ");
                                const firstName = name[0];
                                const lastName = name[1];
                                //make DB connection 
                                connection.query(
                                    `SELECT * FROM employee WHERE first_name='${firstName}' AND last_name='${lastName}'`,
                                    (err, res) => {
                                        if (res) {
                                            //translate role_id to text
                                            let job;
                                            switch(res[0].role_id) {
                                                case 1: job='IT Specialist'; break;
                                                case 2: job='Manager'; break;
                                                case 3: job='Engineer'; break;
                                              
                                            }
                                            
                                            console.log(`\n Current role of ${answer.employeeName} is: ${job} \n`);
    
                                            //make DB connection 
                                            connection.query('SELECT * FROM role', (err, res) => {
                                                let roles = []
                                                res.forEach((role) => {roles.push(role.title)});
    
                                                //prompt user for new role 
                                                inquirer
                                                    .prompt({
                                                        name: 'newRole',
                                                        type: 'list',
                                                        message: 'Choose new role for employee: ',
                                                        choices: roles,
                                                    })
                                                    .then((response) => {
                                                        console.log('New role chosen: ', response.newRole);
    
                                                        //translate role choice back into number for role_id
                                                        let role_id;
                                                        switch(response.newRole) {
                                                            case 'IT Specialist': role_id = 1; break;
                                                            case 'Engineer': role_id = 2; break;
                                                            case 'Manager': role_id = 3; break;
                                                            
                                                        }
    
                                                        //make update to DB 
                                                        console.log('role upadted \n');
                                                        connection.query(`UPDATE employee SET role_id=${role_id} WHERE first_name='${firstName}' AND last_name='${lastName}' `);
                                                        
                                                    })})
                                        } 
                                    }
                                )
                            })
                        break;   
                     
                    }
                })
        }        