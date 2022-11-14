const inquirer = require('inquirer')
const express = require('express');
const mysql = require('mysql2');
const table = require('console.table');
// require('dotenv').config()

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//     }
// )

const options = [
    "View all departments", "View all roles", "View all employees",
    "Add a department","Add a role", "Add an employee", 
    "Update an employee role", "Nothing"
]

const init = () => {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: options,
                loop: false,
                name: "selection"
            }
        ])
        .then((data) => {
            switch(data.selection){
                case options[0]:
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