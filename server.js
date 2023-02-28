const inquirer = require('inquirer');
// const mysql = require('mysql2');
// const cTable = require('console.table');



// // connectiong to sql db
// const db = mysql.createConnection(
//   {
//   host: 'localhost',
//     // MySQL username,
//   user: 'root',
//     // MySQL password - password protected by .env
//   password: 'Goochymama69420!',
//   database: 'employee_db'
//   },
//   console.log(`Connected to the courses_db database.`),
// );

// db.connect(function(error) {
//   if(error) throw error;
//   console.log("connected at " + db.threadID+"\n");
//   promptUser();
// })


// var to be able to call the prompt. Gives choices of all options and if statments on what happens when a choic is chosen.
const promptUser = () => {
  return inquirer.prompt ([
    {
      type: 'list',
      message: 'Please select an option',
      choices:['View all departments','View all roles', 'View all employees', 'Add a department', 'Add a role','Add an employee','Update an employee role','quit']
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

promptUser();

