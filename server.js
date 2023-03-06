const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');



// connectiong to sql db
const db = mysql.createConnection(
  {
  host: 'localhost',
    // MySQL username,
  user: 'root',
    // MySQL password - password protected by .env
  password: 'Goochymama69420!',
  database: 'employee_db'
  },
  console.log(`Connected to the courses_db database.`),
);

db.connect(function(error) {
  if(error) throw error;
  console.log("connected at " + db.threadID+"\n");
  promptUser();
})


// var to be able to call the prompt. Gives choices of all options and if statments on what happens when a choic is chosen.
const promptUser = () => {
  return inquirer.prompt ([
    {
      type: 'list',
      name: 'choices',
      message: 'Please select an option',
      choices:['View all departments',
                'View all roles', 
                'View all employees',
                'Add a department', 
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'quit']
    }
  ])
  .then((answers)=>{
    const { choises } = answers;
    if(choices === 'View all departmetns'){
      showDepartments();
    }
    if(choices === 'View all roles'){
      showRoles();
    }
    if(choices === 'View all employess'){
      showEmployes();
    }
    if(choices === 'Add a department'){
      addDepartments();
    }
    if(choices === 'Add a role'){
      addRole();
    }
    if(choices === 'Add an employee'){
      addEmployee();
    }
    if(choices === 'Update an employee role'){
      updateRole();
    }
    if(choices === 'Quit'){
      db.end();
    }
  })
};

// will show all departments
function showDepartments(){
 const mySql = `SELECT department.id AS id, department.name AS name FROM department`;

 db.query(mySql,(err,results) => {
  if(err) throw err;
  console.log('Showing all departments');
  console.log(results);
  promptUser();
 })
};

// will show all roles 
function showRoles() {
 const mysql = `SELECT role.id, role.title, department.name AS department, role.salary    FROM role
  INNER JOIN department ON role.department_id = department.id`;

  db.query(mySql,(err,results) => {
    if(err) throw err;
     console.log('Showing all Roles');
      console.log(results);
      promptUser();
  })
 
};

//Will show all employess selected
function showEmployees(){

  const mySql = `SELECT employee.id, 
              employee.first_name, 
              employee.last_name, 
              role.title, 
              department.name AS department,
              role.salary, 
              CONCAT (manager.first_name, " ", manager.last_name) AS manager
              FROM employee
              LEFT JOIN role ON employee.role_id = role.id
              LEFT JOIN department ON role.department_id = department.id
              LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  db.query(mySql, (err, results) => {
      if (err) throw err; 
      console.log("Showing all employees");
      console.table(results);
      promptUser();
  });
};

// Add a department
function addDepartment(){
  inquirer.prompt([
      {
          type: 'input', 
          name: 'addDept',
          message: "Please add a department",
      }
  ])
      .then(answer => {
      const mySql = `INSERT INTO department (name) VALUES (?)`;
      db.query(mySql, answer.addDept, (err, result) => {
          if (err) throw err;
          console.log("----------------------------------------------".rainbow);
          console.log(colors.green.bold('Added new Department:  ' + answer.addDept)); 
          showDepartments();
      });
  });
};

// add a role
function addRole(){
  inquirer.prompt([
      {
          type: 'input', 
          name: 'role',
          message: "Enter the new role",
      },
      {
          type: 'input', 
          name: 'salary',
          message: "Enter the salary of this role",
      }
  ])
      .then(answer => {
          const roleSalary = [answer.role, answer.salary];
  
        // getting the dept from dept table
          const roleDb = `SELECT name, id FROM department`; 
  
          db.query(roleDb, (err, data) => {
          if (err) throw err; 
      
          const dept = data.map(({ name, id }) => ({ name: name, value: id }));
  
          inquirer.prompt([
          {
              type: 'list', 
              name: 'dept',
              message: "Select the correct department for this new role.",
              choices: dept
          }
          ])
              .then(deptSelect => {
              const dept = deptSelect.dept;
              roleSalary.push(dept);
  
              const newRole = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
              db.query(newRole, roleSalary, (err, result) => {
                  if (err) throw err;
                  console.log("----------------------------------------------".rainbow);
                  console.log(colors.green.bold('Added new Role:  ' + answer.role)); 
              showRoles();
          });
      });
  });
  });
};