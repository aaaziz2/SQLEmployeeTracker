const inquirer = require('inquirer')
const { db, table } = require('./helper/query')


const options = [
    "View all departments", "View all roles", "View all employees",
    "Add a department","Add a role", "Add an employee", 
    "Update an employee role", "Nothing"
]

const viewAllDepartments = () => {
    db.query(`SELECT department.id AS "Department ID", department.name AS "Department" FROM department`, function (err, data) {
      console.log(`\n\nAll Departments:`);
      table(data);
      console.log('Press up or down key to return to menu')
    });
    init()
  }

const viewAllRoles = () => {
    db.query(`SELECT role.id AS "Role ID", role.title AS "Title", 
                role.salary AS "Salary", department.name AS "Department" 
                FROM role
                JOIN department
                ON role.department_id = department.id`, 
    
        function (err, data) {
            console.log(`\n\nAll Roles:`);
            table(data);
            console.log('Press up or down key to return to menu')
        }
    )
    init()
}

const viewAllEmployees = () => {
    console.log(employeeList)
    let bosses = [...employeeList]
    db.query(
        `SELECT employee.id AS "Employee ID", employee.first_name AS "First",
        employee.last_name AS "Last", role.title AS "Title", role.salary AS "Salary",
        employee.manager_id AS "Manager"
        FROM employee
        JOIN role
        ON employee.role_id = role.id`,
    function (err, data) {
        console.log(`\n\nAll Employees:`);
        for(let i = 0;i<data.length;i++){
            if(data[i].Manager == null){
                data[i].Manager = "N/A"
            }
            else{
                data[i].Manager = bosses[data[i].Manager]
            }
        }
        table(data);
        console.log('Press up or down key to return to menu')
    })
    init()
}

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "department",
                message: "What department would you like to add?"
            }
        ])
        .then((data) =>{
            db.query(`INSERT INTO department (name) VALUES ('${data.department}')`, (err,res) =>{
                if(err) throw err
                viewAllDepartments()
            })             
        })
}
const departmentList = ["string"]
const getDepartments = () => {
    while(departmentList.length>0){
        departmentList.pop()
    }
    db.query("SELECT * FROM department;", function (err, res) {
    
        for (let i = 0; i < res.length; i++){
            departmentList.push(`${res[i].name}`)
        }
    })
    return
}
const roleList = ["string"]
const getRoles = () => {
    while(roleList.length>0){
        roleList.pop()
    }
    db.query("SELECT * FROM role;", function (err, res) {
    
        for (let i = 0; i < res.length; i++){
            roleList.push(`${res[i].title}`)
        }
    })
    return
}

const employeeList = ["string"]
const getEmployees = () => {
    while(employeeList.length>0){
        employeeList.pop()
    }
    db.query("SELECT * FROM employee;", function (err, res) {
    
        for (let i = 0; i < res.length; i++){
            employeeList.push(`${res[i].first_name} ${res[i].last_name}`)
        }
    })
    employeeList.push("N/A")
    return
}

const addRole = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "department",
                choices: departmentList,
                message: "What departmart are you adding a role to?"
            },
            {
                type: "input",
                name: "role",
                message: "What is the name of the role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?"
            },
        ])
        .then((data) =>{
            let id = departmentList.indexOf(data.department)
            id++
            db.query(`INSERT INTO role (title, salary, department_id) 
            VALUES ('${data.role}', '${data.salary}', '${id}')`, (err,res) =>{
                if(err) throw err
                viewAllRoles()
            })             
        })
}

const addEmployee = () => {
    const roleIDs = [...roleList]
    const bosses = [...employeeList]
    inquirer
        .prompt([
            {
                type: "input",
                name: "first",
                message: "Employee's first name?"
            },
            {
                type: "input",
                name: "last",
                message: "Employee's last name?"
            },
            {
                type: "list",
                name: "role",
                choices: roleIDs,
                message: "What is this employee's role?"
            },
            {
                type: "list",
                name: "manager",
                choices: bosses,
                message: "Who does this employee report to?"
            },
        ])
        .then((data) => {
            let roleID = roleIDs.indexOf(data.role)
            roleID++
            let boss = bosses.indexOf(data.manager)
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES ('${data.first}', '${data.last}', '${roleID}', '${boss}')`, (err,res) =>{
                if(err) throw err
                viewAllEmployees()
            }) 
        })
}

const updateEmployee = () =>{
    
}

var questions = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: options,
        // loop: false,
        name: "selection"
    }
]

const init = () => {
    getDepartments()
    getEmployees()
    getRoles()
    inquirer
        .prompt(questions)
        .then((data) => {
            switch(data.selection){
                case options[0]:
                    viewAllDepartments() 
                    break;
                case options[1]:
                    viewAllRoles()
                    break;
                case options[2]:
                    viewAllEmployees()
                    break;
                case options[3]:
                    addDepartment()
                    break;
                case options[4]:
                    addRole()
                    break;
                case options[5]:
                    addEmployee()
                    break;
                case options[6]:
                    break;
                default:
                    console.log('Goodbye')
                    db.end()
                    break;
            }
        })
}

init()