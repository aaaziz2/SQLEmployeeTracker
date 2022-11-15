const mysql = require('mysql2');
// https://stackoverflow.com/questions/49618069/remove-index-from-console-table
const { Console } = require('console');
const { Transform } = require('stream');
require('dotenv').config()

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
)

function table(input) {
    // @see https://stackoverflow.com/a/67859384
    const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
    const logger = new Console({ stdout: ts })
    logger.table(input)
    const table = (ts.read() || '').toString()
    let result = '';
    for (let row of table.split(/[\r\n]+/)) {
      let r = row.replace(/[^┬]*┬/, '┌');
      r = r.replace(/^├─*┼/, '├');
      r = r.replace(/│[^│]*/, '');
      r = r.replace(/^└─*┴/, '└');
      r = r.replace(/'/g, ' ');
      result += `${r}\n`;
    }
    console.log(result);
  }
  


module.exports = { db, table }