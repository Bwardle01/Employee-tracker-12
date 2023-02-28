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
function showRoles {
 const mysql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role
                INNER JOIN department ON role.department_id = department.id`;

  db.query(mySql,(err,results) => {
    if(err) throw err;
     console.log('Showing all Roles');
      console.log(results);
      promptUser();
  })
 
};
