const inquirer = require('inquirer')
const { db } = require('./helper/query')


const options = [
    "View all departments", "View all roles", "View all employees",
    "Add a department","Add a role", "Add an employee", 
    "Update an employee role", "Nothing"
]

const viewAllDepartments = () => {
    db.query(`SELECT department.id AS "Department ID", department.name AS "Department" FROM department`, function (err, data) {
      console.log('\n\n\n')
      console.log(`All Departments:`);
      console.table(data);
      console.log('Press any key to return to menu')
      console.log('\n\n\n')
    });
    init()
  }


var questions = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: options,
        loop: false,
        name: "selection"
    }
]


const init = () => {
    inquirer
        .prompt(questions)
        .then((data) => {
            switch(data.selection){
                case options[0]:
                    viewAllDepartments() 
                    break;
                case options[1]:
                    break;
                case options[2]:
                    break;
                case options[3]:
                    break;
                case options[4]:
                    break;
                case options[5]:
                    break;
                case options[6]:
                    break;
                default:
                    console.log("Goodbye!")
                    break;
            }
        })
}

init()